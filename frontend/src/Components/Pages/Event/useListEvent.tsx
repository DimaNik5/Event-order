import { useState } from "react";
import { Event } from "./types";
import { IconElements, PenIcon, UserIcon } from "@/Assets/icons";
import styles from './EventPageStyles.module.scss'
import useNavigation from "@/Hooks/useNavigation";


export default function useListEvent(){
    const {goTo} = useNavigation(); 

    let mainList = [
        {
            name: "Название",
            date: "1.1.2026",
            numbers: 10,
            isPart: true,
            isYour: false
        },
        {
            name: "Название1",
            date: "1.2.2026",
            numbers: 1,
            isPart: true,
            isYour: true
        },
        {
            name: "Название0",
            date: "1.2.2026",
            numbers: 1,
            isPart: false,
            isYour: false
        },
        {
            name: "Название1",
            date: "1.2.2026",
            numbers: 1,
            isPart: true,
            isYour: false
        },
        {
            name: "Название1",
            date: "1.2.2026",
            numbers: 1,
            isPart: true,
            isYour: true
        },
        {
            name: "Название",
            date: "1.1.2026",
            numbers: 10,
            isPart: true,
            isYour: false
        },
        {
            name: "Название1",
            date: "1.2.2026",
            numbers: 1,
            isPart: true,
            isYour: true
        },
        {
            name: "Название0",
            date: "1.2.2026",
            numbers: 1,
            isPart: false,
            isYour: false
        },
        {
            name: "Название1",
            date: "1.2.2026",
            numbers: 1,
            isPart: true,
            isYour: false
        },
        {
            name: "Название1",
            date: "1.2.2026",
            numbers: 1,
            isPart: true,
            isYour: true
        }
    ];

    const [list, setList] = useState(mainList);

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
                    <div className={styles.element_some_info}>{value.date}</div>
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
        goTo("1")
    }

    return [list, createContent, updateList, clikOnElement] as const;
}

