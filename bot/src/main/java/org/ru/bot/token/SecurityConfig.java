package org.ru.bot.token;


import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Конфигурация безопасности приложения.
 * Настраивает аутентификацию на основе JWT токенов и правила доступа к API.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {


    private static final String[] PUBLIC_ENDPOINTS = {
            "/user/login",
            "/user/refresh",
            "/user/create",
            "/error",
            "/swagger-ui/**",
            "/v3/api-docs/**"
    };

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler accessDeniedHandler;
    private final JwtTokenFilter jwtTokenFilter;
    private final TelegramTokenFilter telegramTokenFilter;

    public SecurityConfig(JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, CustomAccessDeniedHandler accessDeniedHandler, JwtTokenFilter jwtTokenFilter, TelegramTokenFilter telegramTokenFilter) {
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.accessDeniedHandler = accessDeniedHandler;
        this.jwtTokenFilter = jwtTokenFilter;
        this.telegramTokenFilter = telegramTokenFilter;
    }

    /**
     * Конфигурация цепочки фильтров безопасности.
     *
     * @param http объект для настройки безопасности
     * @return настроенная цепочка фильтров
     * @throws Exception при ошибках конфигурации
     */
    @Bean
    @Order(1)
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Отключение CSRF защиты, так как используем JWT
                .csrf(AbstractHttpConfigurer::disable)

                // Настройка управления сессией (без сохранения состояния)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Добавление JWT фильтра перед стандартным фильтром аутентификации
                .addFilterBefore(telegramTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtTokenFilter, TelegramTokenFilter.class)
                // Настройка правил авторизации запросов
                .authorizeHttpRequests(auth -> auth
                        // Статические файлы и публичные эндпоинты
                        .requestMatchers(PUBLIC_ENDPOINTS).permitAll()

                        // Админские эндпоинты
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/admin/users/**").hasAnyRole("ADMIN", "SUPER_ADMIN")
                        .requestMatchers("/api/admin/settings/**").hasRole("SUPER_ADMIN")

                        // Все остальные приватные эндпоинты требуют аутентификации
                        .requestMatchers("/api/private/**").authenticated()

                        .anyRequest().permitAll()
                )
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandler)
                );


        return http.build();
    }

    @Component
    public static class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

        @Override
        public void commence(HttpServletRequest request,
                             HttpServletResponse response,
                             AuthenticationException authException) throws IOException {

            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

            Map<String, Object> body = new HashMap<>();
            body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
            body.put("error", "Unauthorized");
            body.put("message", authException.getMessage());
            body.put("path", request.getServletPath());

            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(response.getOutputStream(), body);
        }
    }

    @Component
    public static class CustomAccessDeniedHandler implements AccessDeniedHandler {

        @Override
        public void handle(HttpServletRequest request,
                           HttpServletResponse response,
                           AccessDeniedException accessDeniedException) throws IOException {

            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);

            Map<String, Object> body = new HashMap<>();
            body.put("status", HttpServletResponse.SC_FORBIDDEN);
            body.put("error", "Forbidden");
            body.put("message", "Access denied. Required role: " +
                    accessDeniedException.getMessage());
            body.put("path", request.getServletPath());

            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(response.getOutputStream(), body);
        }
    }

}