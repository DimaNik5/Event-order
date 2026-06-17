import { ReactNode, createContext, useEffect, useState } from "react";


export default function useTheme(){
    
  const [theme, setTheme] = useState('dark');
  const ThemeContext = createContext({ theme, setTheme });

  useEffect(() => {
    // Устанавливаем тему на корневой элемент
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const ThemeContextProvider = ({children}: {children: ReactNode}) => {
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
  }

  const changeTheme = () => {
    if(theme === 'dark') setTheme('light');
    else setTheme('dark');
  }

  return {
    ThemeContextProvider,
    changeTheme
  }
}