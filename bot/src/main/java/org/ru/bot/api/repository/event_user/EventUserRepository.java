package org.ru.bot.api.repository.event_user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventUserRepository extends JpaRepository<EventUser, EventUser.PrimaryKey> {

    @Query(value = "SELECT id_user \n" +
            "FROM users_of_event \n" +
            "WHERE id_event = :eventId", nativeQuery = true)
    List<Long> findByEvent(Long eventId);
}
