package org.ru.bot.api.dto.responce.exception;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Абстрактный базовый класс для пользовательских исключений API.
 * Предоставляет стандартизированный формат обработки и возврата ошибок.
 */
@JsonIgnoreProperties(value = {"cause", "stackTrace", "suppressed", "localizedMessage"})
public abstract class AbstractException extends RuntimeException{

    protected final HttpStatus httpStatus;

    protected final String message;

    /**
     * Конвертирует исключение в стандартизированный HTTP-ответ
     * @return ResponseEntity с соответствующим HTTP статусом и сообщением об ошибке
     */
    public ResponseEntity<?> asResponse() {
        return ResponseEntity.status(httpStatus).body(message);
    }

    /**
     * Основной конструктор для создания исключения
     * @param httpStatus HTTP статус ошибки
     * @param message понятное сообщение об ошибке
     */
    public AbstractException(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }

    /**
     * Конструктор по умолчанию для неожиданных ошибок
     * Устанавливает статус 500 (Internal Server Error)
     */
    public AbstractException() {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        message = "Ошибка сервера";
    }
}
