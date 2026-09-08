import { useEffect, useState } from "react";
import { IconElements, PenIcon, UserIcon } from "@/Assets/icons";
import styles from './EventPageStyles.module.scss'
import useNavigation from "@/Hooks/useNavigation";
import { Event } from "@/Models/Common/Event";
import useData from "@/Hooks/useData";


export default function useListEvent(){
    const {goTo} = useNavigation(); 
    const {getData} = useData()
    
    const mainList = getData.events().data as Event[];

    const [list, setList] = useState<Event[]>([]);

    useEffect(() => {
        if(mainList){
            setList(mainList);
        }
    }, [mainList]);

    const updateList = (fil: string) =>{
        if(fil === "Все"){
            setList(mainList);
        }
        else if(fil === "Участие"){
            setList(mainList.filter(e => e.isPart));
        }
        else if(fil === "Мои"){
            setList(mainList.filter(e => e.isYour));                
        }
    }

    const createContent = (value: Event) => {
        return (
            <div>
                <div className={styles.element_info}>
                    <div className={styles.element_name}>{value.name}</div>
                    <div className={styles.element_some_info}>{new Date(value.date).toLocaleDateString('ru-RU')}</div>
                    <div className={styles.element_some_info}>Участников: {value.numbers}</div>
                </div>
                <div className={styles.element_type}>
                    {value.isPart &&
                        (value.isYour ? <PenIcon height="100%" width="100%" color="var(--accent-color)"/>
                                        : <UserIcon height="100%" width="100%" color="var(--accent-color)"/>)
                    }
                </div>
            </div>
        );
    }

    const clikOnElement = (value: Event) => {
        goTo(`${value.id}`)
    }

    return [list, createContent, updateList, clikOnElement] as const;
}

