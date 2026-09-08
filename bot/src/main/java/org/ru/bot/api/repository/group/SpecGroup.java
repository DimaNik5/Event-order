package org.ru.bot.api.repository.group;

import jakarta.persistence.*;

@Entity
@Table(name = "group_of_specialization")
public class SpecGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    public SpecGroup(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public SpecGroup() {
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
}
