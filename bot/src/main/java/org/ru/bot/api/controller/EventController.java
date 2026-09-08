package org.ru.bot.api.controller;

import org.ru.bot.api.dto.request.EventCreate;
import org.ru.bot.api.dto.request.EventUpdate;
import org.ru.bot.api.dto.request.PageInfo;
import org.ru.bot.api.dto.responce.EventInfo;
import org.ru.bot.api.repository.page.Page;
import org.ru.bot.api.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "events")
public class EventController {

    public final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<EventInfo> events(){
        return eventService.getEvents();
    }

    @PostMapping(path = "create")
    public void create(@RequestBody EventCreate eventCreate){
        eventService.create(eventCreate);
    }

    @PostMapping(path = "update")
    public void update(@RequestBody EventUpdate eventInfo){
        eventService.update(eventInfo);
    }

    @GetMapping(path = "/{id}/pages")
    public List<Page> pages(@PathVariable Long id){
        return eventService.pages(id);
    }

    @PostMapping(path = "/{id}/page/update")
    public void updatePage(@PathVariable Long id, @RequestBody PageInfo pageInfo){
        eventService.updatePage(id, pageInfo);
    }
}
