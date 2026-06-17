
import useNavigation from "@/Hooks/useNavigation";
import { UserOfEvent } from "./types";
import styles from './UsersOfEventPageStyles.module.scss'
import { ExitIcon, GarbageIcon } from "@/Assets/icons";
import { Header } from "@/Components/Dummies/Header";
import { useState } from "react";

export default function useApplicationPage(){
    const {goBack, goTo} = useNavigation();

    const mainlist: UserOfEvent[] = [
        {
            name: "User1",
            role: "Администратор"
        },
        {
            name: "User2",
            role: "Лидер"
        },
        {
            name: "User3",
            role: "Служитель"
        }
    ]

    const [list, setList] = useState(mainlist);

    const delUser = (email: string) => {
        setList(list.filter(u => u.role !== email));
    }

    const createContent = (value: UserOfEvent) => {
        return (
            <div>
                <div className={styles.element_info}>
                    <div className={styles.element_name}>{value.name}</div>
                    <div className={styles.element_role}>{value.role}</div>
                </div>
                {(true && value.name !=="User2") &&
                    <button className={styles.element_icon} onClick={() => delUser(value.name)}>
                        <GarbageIcon height="100%" width="100%" color="var(--accent-color)"/>
                    </button>
                }
                {value.name === "User2" &&
                    <button className={styles.element_icon} onClick={() => delUser(value.name)}> 
                        <ExitIcon height="100%" width="100%" color="var(--accent-color)"/>
                    </button>
                }
            </div>
        );
    }
    
    const head = <Header licon="arrow" lhandleClick={goBack} isBotton={true}>Участники</Header>

    const handleaddUser = () => {
        goTo('add');
    }

    return [head, list, createContent, handleaddUser] as const;
}