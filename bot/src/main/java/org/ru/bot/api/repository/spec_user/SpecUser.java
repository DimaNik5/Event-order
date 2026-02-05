package org.ru.bot.api.repository.spec_user;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "specialization_of_user")
public class SpecUser {

    @EmbeddedId
    private PrimaryKey primaryKey;

    public static class PrimaryKey {
        @Column(name = "id_specialization")
        private Integer idSpecialization;
        @Column(name = "id_user")
        private Long idUser;

        public PrimaryKey(Integer idSpecialization, Long idUser) {
            this.idSpecialization = idSpecialization;
            this.idUser = idUser;
        }

        public PrimaryKey() {
        }

        public Integer getIdSpecialization() {
            return idSpecialization;
        }

        public void setIdSpecialization(Integer idSpecialization) {
            this.idSpecialization = idSpecialization;
        }

        public Long getIdUser() {
            return idUser;
        }

        public void setIdUser(Long idUser) {
            this.idUser = idUser;
        }
    }

    public SpecUser(PrimaryKey primaryKey) {
        this.primaryKey = primaryKey;
    }

    public SpecUser() {
    }

    public PrimaryKey getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(PrimaryKey primaryKey) {
        this.primaryKey = primaryKey;
    }
}
