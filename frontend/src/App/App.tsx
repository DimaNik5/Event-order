
import React, { createContext, useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import EventPage from '../pages/event/EventPage';
// import UserPage from '../pages/user/UserPage';
// import UserListPage from '../pages/userList/UserListPage';
// import SignPage from '../pages/sign/SignPage';
// import Background from '../components/background/Background';

// npm install react-router-dom
// npm install sass



export default function App() {
  
  const [theme, setTheme] = useState('light');
  const ThemeContext = createContext({ theme, setTheme });

  useEffect(() => {
    // Устанавливаем тему на корневой элемент
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <BrowserRouter>
        <Background>
          <Routes>
            <Route path="/" element={<SignPage />} />
            <Route path="/event" element={<EventPage />}></Route>
            <Route path="/user" element={<UserPage />}></Route>
            <Route path="/users" element={<UserListPage />}></Route>
          </Routes>
        </Background>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}
