package org.ru.bot.telegram.service;

import org.ru.bot.api.service.UserService;
import org.ru.bot.telegram.config.BotConfig;
import org.ru.bot.api.dto.request.UserIn;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.User;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

@Component
public class TelegramBot extends TelegramLongPollingBot {

    private final BotConfig config;
    private final UserService userService;

    public TelegramBot(BotConfig config, UserService userService) {
        this.config = config;
        this.userService = userService;
    }

    @Override
    public String getBotToken() {
        return config.getToken();
    }

    @Override
    public String getBotUsername() {
        return config.getBotName();
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            String messageText = update.getMessage().getText();

            switch (messageText) {
                case "/start":
                    handleStartCommand(update.getMessage().getFrom());
                    break;
                case "/help":
                    handleHelpCommand(update);
                    break;
                case "/info":
                    handleInfoCommand(update);
                    break;
                default: break;
                    //handleUnknownCommand(message);
            }
        }
    }

    private void handleStartCommand(User user) {
        String name = String.format("%s%s",
                user.getFirstName(),
                user.getLastName() != null ? " " + user.getLastName() : ""
        );
        if(userService.createByTelegram(new UserIn(user.getId(), name, null, null))){
            sendMessage(user.getId(), "Вы успешно зарегестрировались, ожидайте когда вас примут");
            return;
        }
        sendMessage(user.getId(), "Вы ужу зарегестрированы");
    }

    private void handleHelpCommand(Update update) {

    }

    private void handleInfoCommand(Update update) {
    }


    private void sendMessage(Long chatId, String text) {
        SendMessage message = new SendMessage();
        message.setChatId(chatId.toString());
        message.setText(text);

        try {
            execute(message);
        } catch (TelegramApiException e) {
            throw new RuntimeException(e);
        }
    }

}
