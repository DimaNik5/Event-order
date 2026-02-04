CREATE SEQUENCE users_id_seq START WITH -1 INCREMENT BY -1;
CREATE TABLE users (
    id BIGINT DEFAULT nextval('users_id_seq') PRIMARY KEY,
    name VARCHAR(130) NOT NULL,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(60),
    id_role INTEGER REFERENCES roles(id) ON DELETE SET NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(15) UNIQUE NOT NULL
);

CREATE OR REPLACE VIEW user_role_view AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.password,
    r.role_name
FROM users u
LEFT JOIN roles r 
ON u.id_role = r.id;

---------------------------------------------------------------------
-- Создаем функцию для INSERT через представление
CREATE OR REPLACE FUNCTION user_roles_view_insert()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.name IS NULL THEN
        RAISE EXCEPTION 'Нужно передать имя';
    END IF;
    IF NEW.id IS NOT NULL THEN
        INSERT INTO users (id, name)
        VALUES (NEW.id, NEW.name);
    ELSE THEN
        IF NEW.email IS NULL THEN
            RAISE EXCEPTION 'Нужно передать почту';
        END IF;
        INSERT INTO users (name, email, password)
        VALUES (NEW.name, NEW.email, NEW.password);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер INSTEAD OF INSERT
CREATE TRIGGER user_roles_view_insert_trigger
INSTEAD OF INSERT ON user_role_view
FOR EACH ROW
EXECUTE FUNCTION user_roles_view_insert();

-- 4. Функция для UPDATE через представление
CREATE OR REPLACE FUNCTION user_roles_view_update()
RETURNS TRIGGER AS $$
DECLARE
    id_of_role INTEGER;
BEGIN
    SELECT id INTO id_of_role FROM roles WHERE name = NEw.role_name;
    UPDATE users 
    SET name = NEW.name,
        email = NEW.email,
        password = NEW.password,
        id_role = id_of_role
    WHERE id = OLD.id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Триггер INSTEAD OF UPDATE
CREATE TRIGGER user_roles_view_update_trigger
INSTEAD OF UPDATE ON user_roles_view
FOR EACH ROW
EXECUTE FUNCTION user_roles_view_update();

-- 6. Функция для DELETE через представление
CREATE OR REPLACE FUNCTION user_roles_view_delete()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM users WHERE id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- 7. Триггер INSTEAD OF DELETE
CREATE TRIGGER user_roles_view_delete_trigger
INSTEAD OF DELETE ON user_roles_view
FOR EACH ROW
EXECUTE FUNCTION user_roles_view_delete();
-----------------------------------------------------------------------------


CREATE TABLE group_of_specialization (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE specialization (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL,
    id_group INTEGER REFERENCES group_of_specialization(id) ON DELETE CASCADE
);

CREATE TABLE specialization_of_user (
    id_user BIGINT REFERENCES users(id) ON DELETE CASCADE,
    id_specialization INTEGER REFERENCES specialization(id) ON DELETE CASCADE,
    PRIMARY KEY(id_user, id_specialization)
);

CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    event_time TIMESTAMPTZ NOT NULL,
    creator BIGINT REFERENCES users(id) NOT NULL,
    description TEXT NOT NULL DEFAULT ''
);

CREATE TABLE users_of_event (
    id_user BIGINT REFERENCES users(id) ON DELETE CASCADE,
    id_event BIGINT REFERENCES events(id) ON DELETE CASCADE,
    id_specialization INTEGER REFERENCES specialization(id) ON DELETE SET NULL,
    PRIMARY KEY(id_user, id_event)
);

CREATE TABLE comment (
    id BIGSERIAL PRIMARY KEY,
    id_event BIGINT REFERENCES events(id) NOT NULL ON DELETE CASCADE,
    author BIGINT REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_time TIMESTAMPTZ,
    is_edited BOOLEAN DEFAULT FALSE
);