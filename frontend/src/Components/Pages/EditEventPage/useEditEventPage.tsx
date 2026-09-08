
import { useEffect, useState } from "react";
import useNavigation from "@/Hooks/useNavigation";
import { Header } from "@/Components/Dummies/Header";
import { IconElements } from "@/Assets/icons";
import DecoratedInput from "@/Components/Dummies/DecoratedInput";
import styles from './CreateEventPageStyles.module.scss'
import useData from "@/Hooks/useData";
import { Event } from "@/Models/Common/Event";
import { useParams } from "react-router-dom";

function parseDateFromMask(dateStr: string): Date | null {
    // Проверяем формат ДД.ММ.ГГГГ
    const match = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    
    if (!match) {
        return null;
    }
    
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    
    // Проверяем существование даты
    const date = new Date(year, month - 1, day);
    
    if (date.getDate() !== day || 
        date.getMonth() !== month - 1 || 
        date.getFullYear() !== year) {
        return null;
    }
    
    return date;
}

// Функция для форматирования даты в ISO формат
function toISODate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Функция для форматирования даты в русский формат
function toRussianDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

export default function useEditEventPage(){
    const {getData, setData, setId} = useData();
    const {goBack} = useNavigation();
    const [getDate, setGetDate] = useState(false);
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : undefined;

    const [content, setContent] = useState({"Название": '', "Дата": ''});
    const events = getData.events().data as Event[];
    const [event, setEvent] = useState<Event>({} as Event);

    const update = setData.updateEvent;

    useEffect(() => {
        if(update.isSuccess) goBack();
    }, [update.isSuccess]);
    
    // Поиск события
    useEffect(() => {
        const numericId = id ? parseInt(id, 10) : undefined;
        
        if(numericId === undefined || !events) {
            return;
        }
        
        const foundEvent = events.find(e => e.id === numericId);
        
        if(!foundEvent) {
            goBack();
            return;
        }
        
        if(!foundEvent.isPart) {
            goBack();
            return;
        }
        
        setEvent(foundEvent);
        
        // Правильно форматируем дату
        const eventDate = new Date(foundEvent.date);
        if (!isNaN(eventDate.getTime())) {
            setContent({
                "Название": foundEvent.name, 
                "Дата": toRussianDate(eventDate) // Храним в русском формате для отображения
            });
        }
    }, [id, events]);

    const head = <Header licon="arrow" lhandleClick={goBack} isBotton={true}>Редактирование</Header>
    const calendar = <button onClick={() => setGetDate(true)} className={styles.calendar}>{IconElements['calendar']}</button>

    const setCon = (name: string, cont: string) => {
        if(name === "Дата"){
            // Пытаемся распарсить дату
            const parsedDate = parseDateFromMask(cont);
            
            // Если дата некорректная, просто сохраняем строку как есть
            if(!parsedDate) {
                setContent((prev) => ({
                    ...prev,
                    [name]: cont // Сохраняем введенную строку
                }));
                return;
            }
            
            // Если дата корректная, сохраняем в русском формате
            setContent((prev) => ({
                ...prev,
                [name]: toRussianDate(parsedDate)
            }));
            return;
        }
        setContent((prev) => ({
            ...prev,
            [name]: cont
        }))
    }

    const setNewDate = (date: string) => {
        setContent((prev) => ({
            ...prev,
            ["Дата"]: date 
        }));
        setGetDate(false);
    }

    const save = () => {
        // Конвертируем дату из русского формата в ISO для отправки
        const parsedDate = parseDateFromMask(content.Дата);
        
        if (!parsedDate) {
            console.error('Некорректная дата');
            return;
        }
        
        const newEv: Event = {
            ...event,
            name: content.Название,
            date: parsedDate.toISOString() // Отправляем в ISO формате
        }
        update.mutate(newEv);
    }

    const inputContent = 
        <div className={styles.input_content}>
            <DecoratedInput 
                content={content.Название} 
                name="Название" 
                callback={setCon} 
                maxLength={50}
            />
            <DecoratedInput 
                content={content.Дата} // Уже в русском формате
                name="Дата" 
                callback={setCon} 
                icon={calendar} 
                maxLength={10}
            />
        </div>

    return [head, getDate, inputContent, setNewDate, save] as const;
}