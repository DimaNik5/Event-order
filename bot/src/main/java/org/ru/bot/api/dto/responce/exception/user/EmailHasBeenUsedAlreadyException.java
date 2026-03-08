package org.ru.bot.api.dto.responce.exception.user;

import org.ru.bot.api.dto.responce.exception.AbstractException;
import org.springframework.http.HttpStatus;

/**
 * Исключение, возникающее при попытке регистрации пользователя по email,
 * которая уже используется другим пользователем.
 * Возвращает HTTP статус 409 Conflict.
 */
public class EmailHasBeenUsedAlreadyException extends AbstractException {
    public EmailHasBeenUsedAlreadyException(){
        super(HttpStatus.CONFLICT, "Такая почта уже используется");
    }
}