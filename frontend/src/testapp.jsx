import { useEffect, useState } from 'react';
import { useTelegram } from './hooks/useTelegram';
import React from 'react';

export default function App() {
  const { tg, user, isLoading, isTelegramEnv } = useTelegram();
  const [theme, setTheme] = useState({
    bg_color: '#ffffff',
    text_color: '#000000'
  });

  useEffect(() => {
    if (tg?.themeParams) {
      setTheme({
        bg_color: tg.themeParams.bg_color || '#ffffff',
        text_color: tg.themeParams.text_color || '#000000'
      });
    }
  }, [tg]);

  const handleSendData = () => {
    if (!tg) return;
    
    if (isTelegramEnv) {
      // Реальный вызов Telegram API
      tg.sendData(JSON.stringify({
        action: 'test',
        userId: user?.id,
        timestamp: Date.now()
      }));
      tg.close();
    } else {
      // Эмуляция для браузера
      tg.sendData('test_data');
      alert('В Telegram приложение бы закрылось');
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <p>Инициализация приложения...</p>
      </div>
    );
  }

  return (
    <div 
      className="app"
      style={{
        backgroundColor: theme.bg_color,
        color: theme.text_color,
        minHeight: '100vh',
        padding: '20px'
      }}
    >
      {!isTelegramEnv && (
        <div className="dev-banner">
          ⚠️ РЕЖИМ РАЗРАБОТКИ: Вы не в Telegram. Функции эмулируются.
        </div>
      )}
      
      <h1>{isTelegramEnv ? 'Telegram Mini App' : 'Dev Mode: Telegram Mini App'}</h1>
      
      <div className="user-info">
        <h2>👤 Пользователь</h2>
        <p><strong>Имя:</strong> {user?.first_name} {user?.last_name || ''}</p>
        <p><strong>ID:</strong> {user?.id}</p>
        {user?.username && <p><strong>Username:</strong> @{user.username}</p>}
        <p><strong>Режим:</strong> {isTelegramEnv ? 'Telegram' : 'Браузер'}</p>
        <p><strong>Платформа:</strong> {tg?.platform || 'unknown'}</p>
      </div>
      
      <div className="actions">
        <button 
          onClick={handleSendData}
          className="primary-btn"
          style={{
            backgroundColor: tg?.themeParams?.button_color || '#2481cc',
            color: tg?.themeParams?.button_text_color || '#ffffff'
          }}
        >
          📨 Отправить данные {isTelegramEnv ? 'в Telegram' : '(эмуляция)'}
        </button>
        
        <button 
          onClick={() => tg?.showAlert?.(`Привет от ${user?.first_name || 'пользователя'}!`)}
          className="secondary-btn"
        >
          🔔 Показать уведомление
        </button>
        
        <button 
          onClick={() => {
            const confirm = tg?.showConfirm?.('Закрыть приложение?') || 
                           window.confirm('Закрыть приложение?');
            if (confirm && isTelegramEnv) {
              tg?.close?.();
            }
          }}
          className="danger-btn"
        >
          ❌ Закрыть приложение
        </button>
      </div>
    </div>
  );
}