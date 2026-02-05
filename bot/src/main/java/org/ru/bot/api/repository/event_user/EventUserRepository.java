package org.ru.bot.api.repository.event_user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventUserRepository extends JpaRepository<EventUser, EventUser.PrimaryKey> {
}
