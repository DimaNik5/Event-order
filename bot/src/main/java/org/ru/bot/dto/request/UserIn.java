package org.ru.bot.dto.request;

public record UserIn (Long id,
                      String name,
                      String email,
                      String password) {
}
