package org.ru.bot.token;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.ru.bot.telegram.service.TelegramAuthService;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.regex.Pattern;

@Component
@Order(1)
public class TelegramTokenFilter extends OncePerRequestFilter {

    private static final String TELEGRAM_INIT_DATA_HEADER = "X-Telegram-Init-Data";
    private static final Pattern TELEGRAM_ORIGIN_PATTERN =
            Pattern.compile("^https://(?:[a-zA-Z0-9-]+\\.)?web\\.app\\.?telegram\\.org$");

    private final TelegramAuthService telegramAuthService;
    private final UserDetailsService userDetailsService;


    public TelegramTokenFilter(TelegramAuthService telegramAuthService, UserDetailsService userDetailsService) {
        this.telegramAuthService = telegramAuthService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {

        // Если уже есть аутентификация - пропускаем
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            chain.doFilter(request, response);
            return;
        }


        // Проверяем, что это действительно запрос от Telegram
        if (isValidTelegramRequest(request)) {
            String initData = request.getHeader(TELEGRAM_INIT_DATA_HEADER);

            if (initData != null && !initData.isBlank()) {
                try {
                    // 1. Верифицируем подпись Telegram
                    if (!telegramAuthService.verifyTelegramData(initData)) {
                        throw new AuthenticationServiceException("Invalid Telegram signature");
                    }
                    // Извлекаем данные пользователя из initData
                    UserDetails userDetails = userDetailsService.loadUserByUsername(telegramAuthService.getId(initData));

                    // Устанавливаем аутентификацию в SecurityContext
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                } catch (AuthenticationException e) {
                    // Логируем, но не блокируем - возможно, есть другая аутентификация
                    logger.error("Telegram validation failed", e);
                }
            }
        }

        chain.doFilter(request, response);
    }

    private boolean isValidTelegramRequest(HttpServletRequest request) {
        // Проверяем Origin (самая надежная проверка для Web Apps)
        String origin = request.getHeader("Origin");
        if (origin != null) {
            try {
                URI uri = new URI(origin);
                return TELEGRAM_ORIGIN_PATTERN.matcher(uri.getHost()).matches();
            } catch (URISyntaxException e) {
                return false;
            }
        }

        // Дополнительная проверка для embedded (если Origin не доступен)
        String referer = request.getHeader("Referer");
        String userAgent = request.getHeader("User-Agent");

        return (referer != null && referer.contains("telegram.org")) ||
                (userAgent != null && userAgent.contains("Telegram"));
    }
}
