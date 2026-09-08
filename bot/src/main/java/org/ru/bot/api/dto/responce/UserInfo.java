package org.ru.bot.api.dto.responce;

import org.ru.bot.api.repository.specialization.Specialization;
import org.ru.bot.api.repository.user.User;

import java.util.Arrays;

public record UserInfo(Long id,
                       String name,
                       String email,
                       String number,
                       String role_name,
                       int[] spec) {

    public static UserInfo create(User user, Specialization[] specializations){
        return new UserInfo(user.getId(),
                user.getName(), user.getEmail(), user.getNumber(),
                user.getNameRole(), Arrays.stream(specializations).mapToInt(Specialization::getId).toArray());
    }
}
