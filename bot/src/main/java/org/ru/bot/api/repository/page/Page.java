package org.ru.bot.api.repository.page;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

@Entity
@Table(name = "page")
public class Page {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_event")
    private Long event;
    private String name;
    private String description;

    public Page(Long id, Long event, String name, String description) {
        this.id = id;
        this.event = event;
        this.name = name;
        this.description = description;
    }

    public Page() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEvent() {
        return event;
    }

    public void setEvent(Long event) {
        this.event = event;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
