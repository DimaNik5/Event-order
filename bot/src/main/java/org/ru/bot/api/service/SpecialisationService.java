package org.ru.bot.api.service;

import org.ru.bot.api.dto.responce.SpecInfo;
import org.ru.bot.api.dto.responce.exception.user.UserNotFoundException;
import org.ru.bot.api.repository.group.SpecGroup;
import org.ru.bot.api.repository.group.SpecGroupRepository;
import org.ru.bot.api.repository.specialization.Specialization;
import org.ru.bot.api.repository.specialization.SpecializationRepository;
import org.ru.bot.api.repository.user.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SpecialisationService {

    public final SpecializationRepository specializationRepository;
    public final SpecGroupRepository specGroupRepository;
    public final CurrentUserUtil currentUserUtil;

    public SpecialisationService(SpecializationRepository specializationRepository, SpecGroupRepository specGroupRepository, CurrentUserUtil currentUserUtil) {
        this.specializationRepository = specializationRepository;
        this.specGroupRepository = specGroupRepository;
        this.currentUserUtil = currentUserUtil;
    }

    public List<SpecInfo> spec() {
        Optional<User> optionalUser = currentUserUtil.current();
        if(optionalUser.isPresent()) {
            List<SpecGroup> specGroups = specGroupRepository.findAll();
            List<Specialization> specialisations = specializationRepository.findAll();
            List<SpecInfo> specInfos = new ArrayList<>(specGroups.size());
            specGroups.forEach(g -> specInfos.add(SpecInfo.create(g, specialisations.stream().filter(s -> s.getIdGroup().equals(g.getId())).toList())));
            return specInfos;
        }
        throw new UserNotFoundException();
    }
}
