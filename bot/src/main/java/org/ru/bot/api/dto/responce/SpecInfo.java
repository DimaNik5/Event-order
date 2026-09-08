package org.ru.bot.api.dto.responce;

import org.ru.bot.api.repository.group.SpecGroup;
import org.ru.bot.api.repository.specialization.Specialization;

import java.util.ArrayList;
import java.util.List;

public record SpecInfo(Integer id,
                       String name,
                       List<UnderSpec> spec) {

    public record UnderSpec(Integer id,
                            String name){

        public static UnderSpec create(Specialization specialization){
            return new UnderSpec(specialization.getId(), specialization.getName());
        }

    }

    public static SpecInfo create(SpecGroup specGroup, List<Specialization> specializationList){
        List<UnderSpec> spect = new ArrayList<>(specializationList.size());
        specializationList.forEach(s -> spect.add(UnderSpec.create(s)));
        return new SpecInfo(specGroup.getId(), specGroup.getName(), spect);
    }
}
