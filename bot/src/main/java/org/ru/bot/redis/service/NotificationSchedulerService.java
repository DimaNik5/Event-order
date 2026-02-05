package org.ru.bot.redis.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.ru.bot.redis.dto.NotificationOfEvent;
import org.ru.bot.redis.dto.NotificationType;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Service
public class NotificationSchedulerService {

    private final RedisTemplate<String, String> redisTemplate;
    private ZSetOperations<String, String> zSetOps;

    public NotificationSchedulerService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // Ключи Redis
    private static final String NOTIFICATION_QUEUE = "notifications:scheduled";
    private static final String NOTIFICATION_DATA = "notifications:data:";
//    private static final String USER_SETTINGS = "user:settings:";
//    private static final String NOTIFICATION_HISTORY = "notifications:history:";

    private final ExecutorService notificationExecutor = Executors.newFixedThreadPool(5);


    // Время отправки по умолчанию (10:00 утра)
//    private static final int DEFAULT_HOUR = 10;
//    private static final int DEFAULT_MINUTE = 0;

    @PostConstruct
    public void init() {
        zSetOps = redisTemplate.opsForZSet();
//        log.info("Сервис уведомлений инициализирован");
    }

    /**
     * Запланировать разовое уведомление
     */
    public String scheduleNotification(String eventId, NotificationType type, Instant eventTime) {

        LocalDateTime sendAt = calculateDayBeforeAt8PM(eventTime);
        if(LocalDateTime.now().isAfter(sendAt)){
            throw new RuntimeException("Уже поздно");
        }

        String notificationId = generateNotificationId(eventId, type);
        NotificationOfEvent payload = new NotificationOfEvent(
                eventId,
                type,
                sendAt
        );


        // Сохраняем данные уведомления
        saveNotificationData(notificationId, payload);

        // Добавляем в очередь с временем отправки
        long timestamp = sendAt.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        zSetOps.add(NOTIFICATION_QUEUE, notificationId, timestamp);

//        log.info("Уведомление запланировано: {} для пользователя {}, время: {}",
//                type, userId, sendAt);

        return notificationId;
    }

    /**
     * Основной метод проверки и отправки уведомлений
     * Вызывается по расписанию каждую минуту
     */
    @Scheduled(fixedDelay = 60000) // Каждую минуту
    public void processScheduledNotifications() {
        try {
            long now = System.currentTimeMillis();

            // Берем уведомления, время которых наступило
            // Используем rangeByScoreWithScores для атомарной обработки
            Set<ZSetOperations.TypedTuple<String>> notifications = zSetOps
                    .rangeByScoreWithScores(NOTIFICATION_QUEUE, 0, now, 0, 100);

            if (notifications == null || notifications.isEmpty()) {
                return;
            }

//            log.debug("Найдено {} уведомлений для отправки", notifications.size());

            for (ZSetOperations.TypedTuple<String> tuple : notifications) {
                String notificationId = tuple.getValue();

                // Атомарно удаляем из очереди
                if (zSetOps.remove(NOTIFICATION_QUEUE, notificationId) > 0) {
                    // Отправляем уведомление асинхронно
                    sendNotificationAsync(notificationId);

                    // Проверяем, нужно ли перепланировать (для периодических)
//                    checkAndReschedule(notificationId);
                }
            }

        } catch (Exception e) {
//            log.error("Ошибка обработки уведомлений", e);
        }
    }

    /**
     * Асинхронная отправка уведомления
     */
    private void sendNotificationAsync(String notificationId) {
        notificationExecutor.submit(() -> {
            try {
                // Получаем данные уведомления
                String dataJson = redisTemplate.opsForValue()
                        .get(NOTIFICATION_DATA + notificationId);

                if (dataJson == null) {
//                    log.error("Данные уведомления {} не найдены", notificationId);
                    return;
                }

                NotificationOfEvent payload = deserializeFromJson(dataJson,
                        NotificationOfEvent.class);

                // Отправляем уведомление в зависимости от типа
                boolean success = sendNotification(payload);

                if (success) {
//                    log.info("Уведомление отправлено: {}", notificationId);

                    // Сохраняем в историю
//                    saveToHistory(payload);

                    // Удаляем временные данные
                    redisTemplate.delete(NOTIFICATION_DATA + notificationId);

                } else {
//                    log.error("Не удалось отправить уведомление: {}", notificationId);
                    // Можно переместить в очередь повторных попыток
//                    retryNotification(notificationId, payload);
                }

            } catch (Exception e) {
//                log.error("Ошибка отправки уведомления: {}", notificationId, e);
            }
        });
    }

    /**
     * Отправка уведомления (основная логика)
     */
    private boolean sendNotification(NotificationOfEvent payload) {
        try {
//            log.info("Отправляем уведомление пользователю {}: {}",
//                    payload.getUserId(), payload.getType());

            // В реальном приложении здесь будет:
//            switch (payload.getType()) {
//                case NotificationType.EMAIL_DAILY_DIGEST:
//                    return sendEmail(payload.getUserId(), "Ежедневный дайджест",
//                            buildDailyDigestContent(payload.getData()));
//
//                case NotificationType.EMAIL_WEEKLY_REPORT:
//                    return sendEmail(payload.getUserId(), "Еженедельный отчет",
//                            buildWeeklyReportContent(payload.getData()));
//
//                case NotificationType.PUSH_REMINDER:
//                    return sendPushNotification(payload.getUserId(),
//                            "Напоминание", payload.getData());
//
//                case NotificationType.EMAIL_PROMOTION:
//                    return sendEmail(payload.getUserId(), "Специальное предложение",
//                            buildPromotionContent(payload.getData()));
//
//                case NotificationType.PUSH_ABANDONED_CART:
//                    return sendPushNotification(payload.getUserId(),
//                            "Завершите покупку", payload.getData());
//
//                default:
////                    log.warn("Неизвестный тип уведомления: {}", payload.getType());
//                    return false;
//            }

        } catch (Exception e) {
//            log.error("Ошибка в sendNotification", e);
            return false;
        }
        return false;
    }


    /**
     * Отмена уведомления
     */
    public boolean cancelNotification(String notificationId) {
        try {
            // Удаляем из очереди
            Long removed = zSetOps.remove(NOTIFICATION_QUEUE, notificationId);

            if (removed != null && removed > 0) {
                // Удаляем данные
                redisTemplate.delete(NOTIFICATION_DATA + notificationId);
//                redisTemplate.delete("recurring:" + notificationId);

//                log.info("Уведомление отменено: {}", notificationId);
                return true;
            }

            return false;
        } catch (Exception e) {
//            log.error("Ошибка отмены уведомления: {}", notificationId, e);
            return false;
        }
    }


    /**
     * Получить уведомления пользователя
     */
    public List<NotificationOfEvent> getUEventNotifications(String eventId) {
        List<NotificationOfEvent> notifications = new ArrayList<>();

        try {
            // Ищем уведомления пользователя
            String pattern = NOTIFICATION_DATA + eventId + ":*";
            Set<String> keys = redisTemplate.keys(pattern);

            if (keys != null) {
                for (String key : keys) {
                    String notificationId = key.substring(NOTIFICATION_DATA.length());
                    String dataJson = redisTemplate.opsForValue().get(key);

                    if (dataJson != null) {
                        NotificationOfEvent payload = deserializeFromJson(dataJson,
                                NotificationOfEvent.class);

                        // Проверяем, есть ли в очереди
//                        Double score = zSetOps.score(NOTIFICATION_QUEUE, notificationId);

                        notifications.add(payload);
                    }
                }
            }
        } catch (Exception e) {
//            log.error("Ошибка получения уведомлений пользователя: {}", userId, e);
        }

        return notifications;
    }

    // Вспомогательные методы

    private String generateNotificationId(String eventId, NotificationType type) {
        return eventId + ":" + type + ":" + UUID.randomUUID().toString();
    }

    private void saveNotificationData(String notificationId, NotificationOfEvent payload) {
        redisTemplate.opsForValue().set(
                NOTIFICATION_DATA + notificationId,
                serializeToJson(payload)
        );
    }

    /**
     * На будущее для сохранения статистики
     */
//    private void saveToHistory(NotificationPayload payload) {
//        String key = NOTIFICATION_HISTORY + payload.getUserId() + ":" +
//                LocalDateTime.now().toLocalDate();
//        redisTemplate.opsForList().rightPush(key, serializeToJson(payload));
//        // Установить TTL на 90 дней
//        redisTemplate.expire(key, 90, java.util.concurrent.TimeUnit.DAYS);
//    }
//
//    private void retryNotification(String notificationId, NotificationPayload payload) {
//        // Перепланировать через 5 минут
//        LocalDateTime retryTime = LocalDateTime.now().plusMinutes(5);
//
//        String newId = generateNotificationId(payload.getUserId(), payload.getType());
//        payload.setScheduledTime(retryTime);
//
//        saveNotificationData(newId, payload);
//
//        long timestamp = retryTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
//        zSetOps.add(NOTIFICATION_QUEUE, newId, timestamp);
//
////        log.info("Уведомление перепланировано на повторную отправку: {}", newId);
//    }


    private String serializeToJson(Object obj) {
        // Используйте Jackson
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException("Serialization error", e);
        }
    }

    private <T> T deserializeFromJson(String json, Class<T> clazz) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(json, clazz);
        } catch (Exception e) {
            throw new RuntimeException("Deserialization error", e);
        }
    }

    private LocalDateTime calculateDayBeforeAt8PM(Instant eventTime) {
        // Конвертируем Instant в ZonedDateTime (с учетом часового пояса)
        ZonedDateTime eventDateTime = eventTime.atZone(ZoneId.systemDefault());

        // Вычисляем день до события
        ZonedDateTime dayBefore = eventDateTime.minusDays(1);

        // Устанавливаем время 20:00
        ZonedDateTime notificationTime = dayBefore.withHour(20)
                .withMinute(0)
                .withSecond(0)
                .withNano(0);

        return notificationTime.toLocalDateTime();
    }

    @PreDestroy
    public void shutdown() {
        notificationExecutor.shutdown();
        try {
            if (!notificationExecutor.awaitTermination(30, TimeUnit.SECONDS)) {
                notificationExecutor.shutdownNow();
            }
        } catch (InterruptedException e) {
            notificationExecutor.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }
}