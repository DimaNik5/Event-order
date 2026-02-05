package org.ru.bot.redis.dto;

import org.ru.bot.redis.service.NotificationSchedulerService;

import java.time.LocalDateTime;


public class NotificationOfEvent {
    private String eventId;
    private NotificationType type;
    private LocalDateTime scheduledTime;

    public NotificationOfEvent(String eventId, NotificationType type, LocalDateTime scheduledTime) {
        this.eventId = eventId;
        this.type = type;
        this.scheduledTime = scheduledTime;
    }

    public NotificationOfEvent() {
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public LocalDateTime getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(LocalDateTime scheduledTime) {
        this.scheduledTime = scheduledTime;
    }

}