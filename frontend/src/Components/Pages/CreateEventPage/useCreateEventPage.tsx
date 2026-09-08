
import { useEffect, useState } from "react";
import useNavigation from "@/Hooks/useNavigation";
import { Header } from "@/Components/Dummies/Header";
import { IconElements } from "@/Assets/icons";
import DecoratedInput from "@/Components/Dummies/DecoratedInput";
import styles from './CreateEventPageStyles.module.scss'
import useData from "@/Hooks/useData";
import { User } from "@/Models/Common/User";
import DecorateButton from "@/Components/UI/DecorateButton";
import { Roles } from "@/Constants/Types/RoleType";

function convertToISOUTC(dateStr: string): string {
    const [day, month, year] = dateStr.split('.').map(Number);
    
    // Создаем дату в UTC
    const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    
    return date.toISOString();
  }

  
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


export default function useCreateEventPage(){
    const { getData, setData } = useData();
    const createEvent = setData.createEvent;
    const {goBack} = useNavigation();

    const me = getData.me().data as User;

    useEffect(() => {
        if(me){
            if(me.role_name === Roles.NONE || me.role_name === Roles.MINISTER) goBack();
        }
    }, [me]);

    useEffect(() => {
        if(createEvent.isSuccess) goBack();
    }, [createEvent.isSuccess]);

    const [getDate, setGetDate] = useState(false);

    const [content, setContent] = useState({"Название": '', "Дата": ''});

    const head = <Header licon="arrow" lhandleClick={goBack} isBotton={true}>Создание</Header>
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

    const inputContent= 
        <div className={styles.input_content}>
            <DecoratedInput content={content.Название} name="Название" callback={setCon} maxLength={50}/>
            <DecoratedInput content={content.Дата} name="Дата" callback={setCon} icon={calendar} maxLength={10}/>
        </div>

    const create = () => {
        createEvent.mutate({name: content.Название, date: convertToISOUTC(content.Дата)})
    }
    const createBtn = <DecorateButton onClick={create}>Создать</DecorateButton>

    return [head, getDate, inputContent, setNewDate, createBtn] as const;

}