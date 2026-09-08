package org.ru.bot.api.dto.responce;

import org.ru.bot.api.repository.event.Event;

import java.time.Instant;

public record EventInfo(Long id,
                        String name,
                        Instant date,
                        Integer numbers,
                        Boolean isPart,
                        Boolean isYour,
                        Long author) {

    public static EventInfo create(Event event, Integer num, Boolean isPart, Boolean isYour){
        return new EventInfo(event.getId(),
                event.getName(), event.getEventTime(), num, isPart, isYour, event.getCreator());
    }
}
