package org.ru.bot.api.controller;

import org.ru.bot.api.dto.responce.SpecInfo;
import org.ru.bot.api.service.SpecialisationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "spec")
public class SpecialisationController {

    public final SpecialisationService specialisationService;

    public SpecialisationController(SpecialisationService specialisationService) {
        this.specialisationService = specialisationService;
    }

    @GetMapping
    public List<SpecInfo> spec(){
        return specialisationService.spec();
    }
}
