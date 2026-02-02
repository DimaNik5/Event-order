import { useState, useEffect } from 'react';

export const useTelegram = () => {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTelegramEnv, setIsTelegramEnv] = useState(false);

  useEffect(() => {
    const init = () => {
      // Проверяем URL на наличие tgHash (Telegram всегда добавляет hash)
      const urlParams = new URLSearchParams(window.location.search);
      const hasTgHash = urlParams.has('tgWebAppStartParam') || 
                       urlParams.has('tgWebAppData') ||
                       window.location.hash.includes('tgWebAppData');

      // Проверяем объект Telegram
      const telegram = window.Telegram;
      const webApp = telegram?.WebApp;
      
      const isTg = !!(
        webApp && 
        webApp.initData && 
        webApp.initDataUnsafe && 
        webApp.platform && 
        (hasTgHash || webApp.platform !== 'unknown')
      );

      setIsTelegramEnv(isTg);

      if (isTg && webApp) {
        // Режим Telegram
        webApp.ready();
        webApp.expand();
        setTg(webApp);
        setUser(webApp.initDataUnsafe?.user || null);
        
        console.log('✅ Работаем в Telegram WebApp');
        console.log('Platform:', webApp.platform);
        console.log('Version:', webApp.version);
        console.log('User:', webApp.initDataUnsafe?.user);
      } else {
        // Режим разработки/браузера
        console.log('🚫 Не в Telegram. Режим разработки.');
        
        // Мок-данные для разработки
        setUser({
          id: Date.now(),
          first_name: 'Тестовый',
          last_name: 'Пользователь',
          username: 'test_user_dev',
          language_code: 'ru'
        });
        
        // Мок Telegram WebApp для разработки
        const mockTg = {
          ready: () => console.log('Mock: ready()'),
          expand: () => console.log('Mock: expand()'),
          close: () => console.log('Mock: close()'),
          sendData: (data) => {
            console.log('Mock: sendData(', data, ')');
            alert(`В Telegram было бы отправлено: ${data}`);
          },
          showAlert: (msg) => {
            console.log('Mock: showAlert(', msg, ')');
            alert(`Telegram Alert: ${msg}`);
          },
          showConfirm: (msg) => {
            console.log('Mock: showConfirm(', msg, ')');
            return window.confirm(msg);
          },
          initData: 'mock_init_data',
          initDataUnsafe: {
            user: {
              id: Date.now(),
              first_name: 'Тестовый',
              last_name: 'Пользователь'
            }
          },
          platform: 'browser',
          version: '7.0',
          themeParams: {
            bg_color: '#ffffff',
            text_color: '#000000',
            button_color: '#2481cc',
            button_text_color: '#ffffff'
          }
        };
        
        setTg(mockTg);
      }
      
      setIsLoading(false);
    };

    // Небольшая задержка для инициализации
    setTimeout(init, 100);
  }, []);

  return {
    tg,
    user,
    isLoading,
    isTelegramEnv
  };
};