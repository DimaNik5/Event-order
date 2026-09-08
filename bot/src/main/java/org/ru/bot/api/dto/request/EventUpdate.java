package org.ru.bot.api.dto.request;

import java.time.Instant;

public record EventUpdate(Long id,
                          String name,
                          String date) {
}
