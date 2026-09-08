package org.ru.bot.api.repository.specialization;

import org.ru.bot.api.repository.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SpecializationRepository extends JpaRepository<Specialization, Integer> {

    @Query(value = "SELECT s.id, s.name, s.id_group\n" +
            "FROM specialization s\n" +
            "INNER JOIN specialization_of_user sou ON s.id = sou.id_specialization\n" +
            "WHERE sou.id_user = :userId;", nativeQuery = true)
    Specialization[] findByUser(Long userId);
}
