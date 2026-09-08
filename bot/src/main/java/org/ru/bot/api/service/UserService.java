package org.ru.bot.api.service;


import org.ru.bot.api.dto.request.RefreshRequest;
import org.ru.bot.api.dto.request.UserIn;
import org.ru.bot.api.dto.responce.UserInfo;
import org.ru.bot.api.dto.responce.exception.BadRequestException;
import org.ru.bot.api.dto.responce.exception.token.NotRefreshTokenException;
import org.ru.bot.api.dto.responce.exception.user.EmailHasBeenUsedAlreadyException;
import org.ru.bot.api.dto.responce.exception.user.UserNotFoundException;
import org.ru.bot.api.repository.specialization.Specialization;
import org.ru.bot.api.repository.specialization.SpecializationRepository;
import org.ru.bot.api.repository.user.User;
import org.ru.bot.api.repository.user.UserRepository;
import org.ru.bot.api.dto.responce.JwtResponse;
import org.ru.bot.token.JwtTokenUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Сервис для работы с пользователями и их данными.
 * Обеспечивает аутентификацию, регистрацию и доступ к пользовательской информации.
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final SpecializationRepository specializationRepository;
    private final CurrentUserUtil currentUserUtil;

    private final JwtTokenUtil jwtTokenUtil;

    public UserService(UserRepository userRepository, JwtTokenUtil jwtTokenUtil, SpecializationRepository specializationRepository, CurrentUserUtil currentUserUtil) {
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.specializationRepository = specializationRepository;
        this.currentUserUtil = currentUserUtil;
    }

    /**
     * Подготавливает данные и отправляет запрос на создание нового пользователя
     * @param userIn Входные данные
     * @return Созданный пользователь
     */
    @Transactional
    private User creating(UserIn userIn){
        User user = new User();
        user.setName(userIn.name());
        user.setEmail(userIn.email());
        user.setPassword(userIn.password());
        user.setNumber(userIn.number());
        System.out.println(user.getEmail());
        int rowsInserted = userRepository.createUser(
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getNumber()
        );
        if (rowsInserted > 0) {
            System.out.println(user.getEmail());
            Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
            if(optionalUser.isPresent()) return optionalUser.get();
        }
        throw new RuntimeException("Не удалось создать пользователя");
    }

    /**
     * Выполняет аутентификацию пользователя
     *
     * @param userIn данные пользователя для входа
     * @return JWT токены доступа
     */
    public JwtResponse login(UserIn userIn) {
        if(userIn.email() == null || userIn.password() == null){
            throw new BadRequestException("Пропущены важные поля");
        }
        Optional<User> optionalUser = userRepository.findByEmail(userIn.email());
        if(optionalUser.isEmpty()){
            throw new UserNotFoundException();
        }
        User user = optionalUser.get();
        if(!user.checkPassword(userIn.password())){
            throw new UserNotFoundException();
        }
        String accessToken = jwtTokenUtil.createToken(user, true);
        String refreshToken = jwtTokenUtil.createToken(user, false);

        return new JwtResponse(accessToken, refreshToken);
    }

    /**
     * Регистрирует нового пользователя
     *
     * @param userIn данные нового пользователя
     * @return JWT токены доступа
     */
    public JwtResponse create(UserIn userIn) {
        if(userIn.name() == null || userIn.name().isEmpty() ||
                userIn.email() == null || userIn.password() == null){
            throw new BadRequestException("Пропущены важные поля");
        }
        Optional<User> optionalUser = userRepository.findByEmail(userIn.email());
        if(optionalUser.isPresent()){
            throw new EmailHasBeenUsedAlreadyException();
        }
        User user = creating(userIn);
        System.out.println(user.getEmail());
        String accessToken = jwtTokenUtil.createToken(user, true);
        String refreshToken = jwtTokenUtil.createToken(user, false);

        return new JwtResponse(accessToken, refreshToken);
    }


    /**
     * Обновляет JWT токены
     *
     * @param request запрос с refresh токеном
     * @return новые JWT токены
     */
    public JwtResponse refresh(RefreshRequest request){
        String refreshToken = request.refreshToken();

        // Проверяем, что токен валиден и не отозван
        if (jwtTokenUtil.isTokenExpired(refreshToken)) {
            String username = jwtTokenUtil.extractUsername(refreshToken);
            Optional<User> optionalUser = userRepository.findByEmail(username);
            if(optionalUser.isEmpty()){
                throw new UserNotFoundException();
            }
            String newAccessToken = jwtTokenUtil.createToken(optionalUser.get(), true);
            return new JwtResponse(newAccessToken, refreshToken);
        } else {
            throw new NotRefreshTokenException();
        }
    }

    public UserInfo me() {
        Optional<User> optionalUser = currentUserUtil.current();
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            Specialization[] spec = specializationRepository.findByUser(user.getId());
            return UserInfo.create(user, spec);
        }
        throw new UserNotFoundException();
    }

    public List<UserInfo> users() {
        Optional<User> optionalUser = currentUserUtil.current();
        if(optionalUser.isPresent()) {
            List<User> users = userRepository.findAll();
            List<UserInfo> userInfos = new ArrayList<>(users.size());
            users.forEach(u -> {
                Specialization[] spec = specializationRepository.findByUser(u.getId());
                userInfos.add(UserInfo.create(u, spec));
            });
            return userInfos;
        }
        throw new UserNotFoundException();
    }
}
