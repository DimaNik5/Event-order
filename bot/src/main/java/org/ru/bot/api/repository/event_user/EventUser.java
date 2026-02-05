package org.ru.bot.api.repository.event_user;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "users_of_event")
public class EventUser {

    @EmbeddedId
    private PrimaryKey primaryKey;
    @Column(name = "id_specialization")
    private Integer idSpecialization;

    public static class PrimaryKey {
        @Column(name = "id_event")
        private Long idEvent;
        @Column(name = "id_user")
        private Long idUser;

        public PrimaryKey(Long idEvent, Long idUser) {
            this.idEvent = idEvent;
            this.idUser = idUser;
        }

        public PrimaryKey() {
        }

        public Long getIdEvent() {
            return idEvent;
        }

        public void setIdEvent(Long idEvent) {
            this.idEvent = idEvent;
        }

        public Long getIdUser() {
            return idUser;
        }

        public void setIdUser(Long idUser) {
            this.idUser = idUser;
        }
    }

    public EventUser(PrimaryKey primaryKey, Integer idSpecialization) {
        this.primaryKey = primaryKey;
        this.idSpecialization = idSpecialization;
    }

    public EventUser() {
    }

    public Integer getIdSpecialization() {
        return idSpecialization;
    }

    public void setIdSpecialization(Integer idSpecialization) {
        this.idSpecialization = idSpecialization;
    }

    public PrimaryKey getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(PrimaryKey primaryKey) {
        this.primaryKey = primaryKey;
    }
}
