package org.ru.bot.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

/**
 * Репозиторий для работы с данными о пользователе.
 * Предоставляет методы для доступа к данным в базе данных.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Находит пользователя по email.
     * Использует нативный SQL-запрос для выборки данных.
     *
     * @param email почта пользователя
     * @return данные пользователя
     */
    @Query(value = "select * from user_role_view where email = :email", nativeQuery = true)
    Optional<User> findByEmail(String email);

}