package org.ru.bot.api.repository.page;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PageRepository extends JpaRepository<Page, Long> {

    @Query(value = "SELECT * \n" +
            "FROM page \n" +
            "WHERE id_event = :eventId", nativeQuery = true)
    List<Page> findByEvent(Long eventId);

}
