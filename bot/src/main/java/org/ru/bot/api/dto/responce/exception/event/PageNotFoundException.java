package org.ru.bot.api.dto.responce.exception.event;


import org.ru.bot.api.dto.responce.exception.AbstractException;
import org.springframework.http.HttpStatus;

public class PageNotFoundException extends AbstractException {
    public PageNotFoundException() {
        super(HttpStatus.NOT_FOUND, "Неверный id страницы");
    }
}