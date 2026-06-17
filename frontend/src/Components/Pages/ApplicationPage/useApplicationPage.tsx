
import useNavigation from "@/Hooks/useNavigation";
import { ApplicationUser } from "./types";
import styles from './ApplicationPageStyles.module.scss'
import { GarbageIcon, IconElements, PlusIcon } from "@/Assets/icons";
import { Header } from "@/Components/Dummies/Header";
import { useState } from "react";

export default function useApplicationPage(){

    
    const {goBack} = useNavigation();

    const mainlist: ApplicationUser[] = [
        {
            name: "User1",
            contact: "email@mail.ru"
        },
        {
            name: "User2",
            contact: "email1@mail.ru"
        },
        {
            name: "User3",
            contact: "email2@mail.ru"
        }
    ]

    const [list, setList] = useState(mainlist);

    const addUser = (email: string) => {
        setList(list.filter(u => u.contact !== email));
    }

    const delUser = (email: string) => {
        setList(list.filter(u => u.contact !== email));
    }

    const createContent = (value: ApplicationUser) => {
        return (
            <div>
                <div className={styles.element_info}>
                    <div className={styles.element_name}>{value.name}</div>
                    <div className={styles.element_contact}>{value.contact}</div>
                </div>
                <button className={styles.element_icon} onClick={() => addUser(value.contact)}>
                    <PlusIcon height="100%" width="100%" color="var(--accent-color)"/>
                </button>
                <button className={styles.element_icon} onClick={() => delUser(value.contact)}>
                    <GarbageIcon height="100%" width="100%" color="var(--accent-color)"/>
                </button>
            </div>
        );
    }
    
    const head = <Header licon="arrow" lhandleClick={goBack} isBotton={true}>Заявки</Header>

    return [head, list, createContent] as const;
}