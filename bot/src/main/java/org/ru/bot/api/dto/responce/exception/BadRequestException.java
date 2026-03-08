package org.ru.bot.api.dto.responce.exception;

import org.springframework.http.HttpStatus;

public class BadRequestException extends AbstractException{
    public BadRequestException(String msg) {
        super(HttpStatus.BAD_REQUEST, msg);
    }
}