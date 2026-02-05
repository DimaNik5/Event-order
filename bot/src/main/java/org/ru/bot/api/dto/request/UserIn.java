package org.ru.bot.api.dto.request;

public record UserIn (Long id,
                      String name,
                      String email,
                      String password) {
}
