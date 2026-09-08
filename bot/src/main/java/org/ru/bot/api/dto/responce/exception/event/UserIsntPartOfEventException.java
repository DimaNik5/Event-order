package org.ru.bot.api.dto.responce.exception.event;


import org.ru.bot.api.dto.responce.exception.AbstractException;
import org.springframework.http.HttpStatus;

public class UserIsntPartOfEventException extends AbstractException {
    public UserIsntPartOfEventException() {
        super(HttpStatus.CONFLICT, "Пользователь не учавствует в событии");
    }
}