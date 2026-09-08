package org.ru.bot.api.dto.responce.exception.token;

import org.ru.bot.api.dto.responce.exception.AbstractException;
import org.springframework.http.HttpStatus;

public class TokenExpiredException  extends AbstractException {
    public TokenExpiredException(){
        super(HttpStatus.UNAUTHORIZED, "Срок действия токена истек");
    }
}