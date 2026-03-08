package org.ru.bot.api.dto.responce.exception.token;

import org.ru.bot.api.dto.responce.exception.AbstractException;
import org.springframework.http.HttpStatus;

/**
 * Исключение, возникающее при попытке обновления JWT токена с использованием
 * недействительного или отсутствующего refresh токена.
 * Возвращает HTTP статус 404 Not Found.
 */
public class NotRefreshTokenException extends AbstractException {
    public NotRefreshTokenException(){
        super(HttpStatus.NOT_FOUND, "Данного refresh токена нет, или истекло время его действия");
    }
}