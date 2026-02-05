package org.ru.bot.api.repository.event;


import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

import java.time.Instant;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(name = "event_time")
    private Instant eventTime;
    private Long creator;
    private String description;

    public Event(Long id, String name, Instant eventTime, Long creator, String description) {
        this.id = id;
        this.name = name;
        this.eventTime = eventTime;
        this.creator = creator;
        this.description = description;
    }

    public Event() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getEventTime() {
        return eventTime;
    }

    public void setEventTime(Instant eventTime) {
        this.eventTime = eventTime;
    }

    public Long getCreator() {
        return creator;
    }

    public void setCreator(Long creator) {
        this.creator = creator;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
