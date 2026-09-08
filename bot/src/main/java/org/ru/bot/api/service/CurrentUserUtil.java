package org.ru.bot.api.service;

import org.ru.bot.api.repository.user.User;
import org.ru.bot.api.repository.user.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CurrentUserUtil {

    private final UserRepository userRepository;

    public CurrentUserUtil(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> current(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            // Получаем имя пользователя (обычно email или username)
            String username = authentication.getName();
            // Загружаем пользователя из БД
            return userRepository.findByEmail(username);
        }

        return Optional.empty();
    }
}
