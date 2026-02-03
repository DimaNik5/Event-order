package org.ru.bot.controller;


import org.ru.bot.dto.responce.JwtResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Контроллер для работы с пользователями системы.
 * Обеспечивает аутентификацию, регистрацию и получение пользовательских данных.
 */
@RestController
@RequestMapping(path = "user")
public class UserController {

    private final UserService userService;

    public UserController(UserService findUserService) {
        this.userService = findUserService;
    }


    /**
     * Аутентификация пользователя в системе.
     * @param user объект с учетными данными пользователя
     * @return JWT токен для доступа к системе
     * @see UserIn
     * @see JwtResponse
     */
    @PostMapping(path = "login")
    public JwtResponse login(@RequestBody UserIn user){
        return userService.login(user);
    }

    /**
     * Регистрация нового пользователя.
     * @param user объект с данными нового пользователя
     * @return JWT токен для доступа к системе
     * @see UserIn
     * @see JwtResponse
     */
    @PostMapping(path = "create")
    public JwtResponse create(@RequestBody UserIn user){
        return userService.create(user);
    }

    /**
     * Обновление JWT токена.
     * @param request объект с refresh токеном
     * @return новая пара access и refresh токенов
     * @see RefreshRequest
     * @see JwtResponse
     */
    @PostMapping("refresh")
    public JwtResponse refreshToken(@RequestBody RefreshRequest request) {
        return userService.refresh(request);
    }
}