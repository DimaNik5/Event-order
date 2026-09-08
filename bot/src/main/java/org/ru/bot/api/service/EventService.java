package org.ru.bot.api.service;

import org.ru.bot.api.dto.request.EventCreate;
import org.ru.bot.api.dto.request.EventUpdate;
import org.ru.bot.api.dto.request.PageInfo;
import org.ru.bot.api.dto.responce.EventInfo;
import org.ru.bot.api.dto.responce.exception.event.EventNotFoundException;
import org.ru.bot.api.dto.responce.exception.event.PageNotFoundException;
import org.ru.bot.api.dto.responce.exception.event.UserIsntPartOfEventException;
import org.ru.bot.api.dto.responce.exception.user.UserNotFoundException;
import org.ru.bot.api.repository.event.Event;
import org.ru.bot.api.repository.event.EventRepository;
import org.ru.bot.api.repository.event_user.EventUser;
import org.ru.bot.api.repository.event_user.EventUserRepository;
import org.ru.bot.api.repository.page.Page;
import org.ru.bot.api.repository.page.PageRepository;
import org.ru.bot.api.repository.user.User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    public final CurrentUserUtil currentUserUtil;
    public final EventRepository eventRepository;
    public final EventUserRepository eventUserRepository;
    public final PageRepository pageRepository;

    public EventService(CurrentUserUtil currentUserUtil, EventRepository eventRepository, EventUserRepository eventUserRepository, PageRepository pageRepository) {
        this.currentUserUtil = currentUserUtil;
        this.eventRepository = eventRepository;
        this.eventUserRepository = eventUserRepository;
        this.pageRepository = pageRepository;
    }

    public List<EventInfo> getEvents(){
        Optional<User> optionalUser = currentUserUtil.current();
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            List<Event> events = eventRepository.findAll();
            List<EventInfo> eventInfos = new ArrayList<>();
            events.forEach(e -> {
                boolean isYour = e.getCreator().equals(user.getId());
                List<Long> eventUsers = eventUserRepository.findByEvent(e.getId());
                boolean isPart = isYour || eventUsers.contains(user.getId());
                eventInfos.add(EventInfo.create(e, eventUsers.size() + 1, isPart, isYour));
            });
            return eventInfos;
        }
        throw new UserNotFoundException();
    }

    public void create(EventCreate eventCreate){
        Optional<User> optionalUser = currentUserUtil.current();
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            if(user.hasAnyRole("SUPER_ADMIN", "ADMIN", "LEADER")){
                Event event = new Event();
                event.setName(eventCreate.name());
                event.setEventTime(Instant.parse(eventCreate.date()));
                event.setCreator(user.getId());
                Event e = eventRepository.save(event);
                eventRepository.flush();
                Page page = new Page();
                page.setEvent(e.getId());
                page.setName("Описание");
                page.setDescription("");
                pageRepository.save(page);
                return;
            }
        }
        throw new UserNotFoundException();
    }

    public List<Page> pages(Long id) {
        Optional<User> optionalUser = currentUserUtil.current();
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            Optional<Event> optionalEvent = eventRepository.findById(id);
            if(optionalEvent.isPresent()){
                Event event = optionalEvent.get();
                List<Long> users = eventUserRepository.findByEvent(id);
                if(event.getCreator().equals(user.getId()) || users.contains(user.getId())){
                    return pageRepository.findByEvent(id);
                }
                throw new UserIsntPartOfEventException();
            }
            throw new EventNotFoundException();
        }
        throw new UserNotFoundException();
    }

    public void update(EventUpdate eventInfo) {
        Optional<User> optionalUser = currentUserUtil.current();
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            Optional<Event> optionalEvent = eventRepository.findById(eventInfo.id());
            if(optionalEvent.isPresent()){
                Event event = optionalEvent.get();
                if(event.getCreator().equals(user.getId())){
                    event.setEventTime(Instant.parse(eventInfo.date()));
                    event.setName(eventInfo.name());
                    eventRepository.save(event);
                    return;
                }
                throw new UserIsntPartOfEventException();
            }
            throw new EventNotFoundException();
        }
        throw new UserNotFoundException();
    }

    public void updatePage(Long id, PageInfo pageInfo) {
        Optional<User> optionalUser = currentUserUtil.current();
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            Optional<Event> optionalEvent = eventRepository.findById(id);
            if(optionalEvent.isPresent()){
                Event event = optionalEvent.get();
                if(event.getCreator().equals(user.getId())){
                    if(pageInfo.id() == null){
                        Page page = new Page();
                        page.setName(pageInfo.name());
                        page.setDescription(pageInfo.description());
                        page.setEvent(event.getId());
                        pageRepository.save(page);
                        return;
                    } else{
                        Optional<Page> optionalPage = pageRepository.findById(pageInfo.id());
                        if(optionalPage.isPresent()){
                            Page page = optionalPage.get();
                            page.setName(pageInfo.name());
                            page.setDescription(pageInfo.description());
                            pageRepository.save(page);
                            return;
                        }
                        throw new PageNotFoundException();
                    }
                }
                throw new UserIsntPartOfEventException();
            }
            throw new EventNotFoundException();
        }
        throw new UserNotFoundException();
    }
}
