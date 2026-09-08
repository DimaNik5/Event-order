package org.ru.bot.api.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

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

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO user_role_view (name, email, password, number) VALUES (:name, :email, :password, :number)", nativeQuery = true)
    int createUser(@Param("name") String name,
                    @Param("email") String email,
                    @Param("password") String password,
                    @Param("number") String number);

}