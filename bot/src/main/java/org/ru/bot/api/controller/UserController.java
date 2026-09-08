package org.ru.bot.api.controller;


import org.ru.bot.api.dto.request.RefreshRequest;
import org.ru.bot.api.dto.request.UserIn;
import org.ru.bot.api.dto.responce.JwtResponse;
import org.ru.bot.api.dto.responce.UserInfo;
import org.ru.bot.api.repository.user.User;
import org.ru.bot.api.service.UserService;
import org.ru.bot.token.JwtTokenUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Контроллер для работы с пользователями системы.
 * Обеспечивает аутентификацию, регистрацию и получение пользовательских данных.
 */
@RestController
@RequestMapping(path = "user")
public class UserController {

    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    public UserController(UserService findUserService, JwtTokenUtil jwtTokenUtil) {
        this.userService = findUserService;
        this.jwtTokenUtil = jwtTokenUtil;
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

    @GetMapping(path = "me")
    public UserInfo meInfo(){
        return userService.me();
    }

    @GetMapping(path = "all")
    public List<UserInfo> users(){
        return userService.users();
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