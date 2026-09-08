package org.ru.bot.api.dto.responce.exception.event;


import org.ru.bot.api.dto.responce.exception.AbstractException;
import org.springframework.http.HttpStatus;

/**
 * Исключение, возникающее при попытке аутентификации несуществующего пользователя
 * или при вводе неверных учетных данных.
 * Также возникает, если пользователь не был найден по токену.
 * Возвращает HTTP статус 404 Not Found.
 */
public class EventNotFoundException extends AbstractException {
    public EventNotFoundException() {
        super(HttpStatus.NOT_FOUND, "Неверный id события");
    }
}