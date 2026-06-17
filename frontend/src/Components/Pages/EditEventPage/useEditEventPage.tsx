
import { useState } from "react";
import useNavigation from "@/Hooks/useNavigation";
import { Header } from "@/Components/Dummies/Header";
import { IconElements } from "@/Assets/icons";
import DecoratedInput from "@/Components/Dummies/DecoratedInput";
import styles from './CreateEventPageStyles.module.scss'


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


export default function useEditEventPage(){
    const {goBack} = useNavigation();
    const [getDate, setGetDate] = useState(false);

    const [content, setContent] = useState({"Название": 'Event', "Дата": '26.4.2026'});

    const head = <Header licon="arrow" lhandleClick={goBack} isBotton={true}>Редактирование</Header>
    const calendar = <button onClick={() => setGetDate(true)} className={styles.calendar}>{IconElements['calendar']}</button>

    const setCon = (name: string, cont: string) => {
        if(name === "Дата"){
            if(!parseDateFromMask(cont)) return;
        }
        setContent((prev) => ({
            ...prev,
            [name]: cont
        }))
    }

    const setNewDate = (date: string) => {
        setCon("Дата", date)
        setGetDate(false);
    }

    const save = () => {

        goBack();
    }

    const inputContent= 
        <div className={styles.input_content}>
            <DecoratedInput content={content.Название} name="Название" callback={setCon} maxLength={50}/>
            <DecoratedInput content={content.Дата} name="Дата" callback={setCon} icon={calendar} maxLength={10}/>
        </div>

    return [head, getDate, inputContent, setNewDate, save] as const;

}