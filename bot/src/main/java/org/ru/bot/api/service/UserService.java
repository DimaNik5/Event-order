package org.ru.bot.api.service;


import org.ru.bot.api.dto.request.RefreshRequest;
import org.ru.bot.api.dto.request.UserIn;
import org.ru.bot.api.repository.user.User;
import org.ru.bot.api.repository.user.UserRepository;
import org.ru.bot.api.dto.responce.JwtResponse;
import org.ru.bot.token.JwtTokenUtil;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Сервис для работы с пользователями и их данными.
 * Обеспечивает аутентификацию, регистрацию и доступ к пользовательской информации.
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    private final JwtTokenUtil jwtTokenUtil;

    public UserService(UserRepository userRepository, JwtTokenUtil jwtTokenUtil) {
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    /**
     * Выполняет аутентификацию пользователя
     *
     * @param userIn данные пользователя для входа
     * @return JWT токены доступа
     */
    public JwtResponse login(UserIn userIn) {
        boolean isTg = userIn.id() != null;
        if(!isTg){
            if(userIn.email() == null || userIn.password() == null){
                throw new RuntimeException("bad request");
            }
        }

        Optional<User> optionalUser = isTg ?
                                        userRepository.findById(userIn.id()) :
                                        userRepository.findByEmail(userIn.email());
        if(optionalUser.isEmpty()){
            throw new RuntimeException("user not found");
        }
        User user = optionalUser.get();
        if(!user.checkPassword(userIn.password())){
            throw new RuntimeException("uncorrect password");
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
            throw new RuntimeException("bad request");
        }
        Optional<User> optionalUser = userRepository.findByEmail(userIn.email());
        if(optionalUser.isPresent()){
            throw new RuntimeException("user is already");
        }
        User user = new User(null, userIn.name(), userIn.email(), userIn.password(), null);

        userRepository.save(user);
        String accessToken = jwtTokenUtil.createToken(user, true);
        String refreshToken = jwtTokenUtil.createToken(user, false);

        return new JwtResponse(accessToken, refreshToken);
    }

    public boolean createByTelegram(UserIn userIn) {
        if(userIn.name() == null || userIn.name().isEmpty() ||
                userIn.id() == null){
            throw new RuntimeException("bad request");
        }
        Optional<User> optionalUser = userRepository.findById(userIn.id());
        if(optionalUser.isPresent()){
            return false;
        }
        User user = new User(userIn.id(), userIn.name(), null, null, null);

        userRepository.save(user);
        return true;
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
            Optional<User> optionalUser;
            try {
                long l = Long.parseLong(username);
                optionalUser = userRepository.findById(l);
            } catch (NumberFormatException e){
                optionalUser = userRepository.findByEmail(username);
            }
            if(optionalUser.isEmpty()){
                throw new RuntimeException("user not found");
            }
            String newAccessToken = jwtTokenUtil.createToken(optionalUser.get(), true);
            return new JwtResponse(newAccessToken, refreshToken);
        } else {
            throw new RuntimeException("not refresh token exception");
        }
    }
}