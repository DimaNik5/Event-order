import { Props } from "./types";
import { useRef, useState } from "react";

export function useDecoratedInput(props: Props){
    
    const [val, setVal] = useState('');
    const submitTimeout = useRef<NodeJS.Timeout>(null);

    function call(){
        if (submitTimeout.current) {
            return;
        }
        props.callback(props.name, val);

        submitTimeout.current = setTimeout(() => {
            submitTimeout.current = null;
        }, 100);
    }

    function validate(e: React.KeyboardEvent<HTMLInputElement>){
        if(e.key === 'Enter'){
            call();
            e.preventDefault(); 
            return;
        }
        const key = e.key;
        
        // Разрешаем управляющие клавиши
        if (key === 'Backspace' || key === 'Delete' || key === 'Tab' || 
            key === 'Escape' || key === 'Enter' || key.startsWith('Arrow')) {
            return; // Не блокируем
        }
        
        // Разрешаем буквы (латиница и кириллица) и пробел
        const isLetter = /^[a-zA-Zа-яА-Я0-9@.!#$%&'*+-/=?^_`{|}~]$/.test(key);
        const isSpace = key === ' ';
        
        if (!isLetter && !isSpace) {
            e.preventDefault(); // Блокируем ввод
        }
    }

    return [val, setVal, call, validate] as const;
}