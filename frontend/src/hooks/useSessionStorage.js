import { useState, useEffect } from "react";

export default function useSessionStorage(key, initialValue, onLoaded) {
    const [storedValue, setStoredValue] = useState(initialValue);
  
    useEffect(() => {
        try {
            const item = sessionStorage.getItem(key);
            let value;
            
            if (item) {
                value = JSON.parse(item);
            } else {
                value = initialValue;
            }
            
            setStoredValue(value);
            
            if (onLoaded) {
                onLoaded(value);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            if (onLoaded) {
                onLoaded(initialValue);
            }
        }
    }, [key, initialValue]);
    
    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            sessionStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };
    
    return [storedValue, setValue];
}