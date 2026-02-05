package org.ru.bot.api.repository.specialization;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;

@Entity
@Table(name = "events")
public class Specialization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @Column(name = "id_group")
    private Integer idGroup;

    public Specialization(Integer id, String name, Integer idGroup) {
        this.id = id;
        this.name = name;
        this.idGroup = idGroup;
    }

    public Specialization() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getIdGroup() {
        return idGroup;
    }

    public void setIdGroup(Integer idGroup) {
        this.idGroup = idGroup;
    }
}
