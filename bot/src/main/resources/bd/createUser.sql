-- 1. Создать пользователя
CREATE USER event_order_app WITH PASSWORD 'Church_Spasenie';

-- 2. Дать право на подключение к БД
GRANT CONNECT ON DATABASE eventdb TO event_order_app;

-- 3. Дать право на использование схемы
GRANT USAGE ON SCHEMA public TO event_order_app;

-- 4. Дать права только на данные в существующих таблицах
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO event_order_app;

-- 5. Дать права на последовательности
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO event_order_app;

-- 6. Настроить права для будущих таблиц
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO event_order_app;

ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT USAGE, SELECT ON SEQUENCES TO event_order_app;