package org.ru.bot.api.repository.comment;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

import java.time.Instant;

@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_event")
    private Long idEvent;
    private Long author;
    private String content;
    @Column(name = "created_time",
            insertable = false,
            updatable = false)
    private Instant createdTime;
    @Column(name = "updated_time",
            insertable = false,
            updatable = false)
    private Instant updatedTime;
    @Column(name = "is_edited",
            insertable = false,
            updatable = false)
    private Boolean isEdited;

    public Comment() {
    }

    public Comment(Long id, Long idEvent, Long author, String content, Instant createdTime, Instant updatedTime, Boolean isEdited) {
        this.id = id;
        this.idEvent = idEvent;
        this.author = author;
        this.content = content;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
        this.isEdited = isEdited;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdEvent() {
        return idEvent;
    }

    public void setIdEvent(Long idEvent) {
        this.idEvent = idEvent;
    }

    public Long getAuthor() {
        return author;
    }

    public void setAuthor(Long author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Instant createdTime) {
        this.createdTime = createdTime;
    }

    public Instant getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Instant updatedTime) {
        this.updatedTime = updatedTime;
    }

    public Boolean getEdited() {
        return isEdited;
    }

    public void setEdited(Boolean edited) {
        isEdited = edited;
    }
}
