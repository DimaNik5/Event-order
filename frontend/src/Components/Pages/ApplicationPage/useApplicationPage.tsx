
import useNavigation from "@/Hooks/useNavigation";
import styles from './ApplicationPageStyles.module.scss'
import { GarbageIcon, IconElements, PlusIcon } from "@/Assets/icons";
import { Header } from "@/Components/Dummies/Header";
import { useEffect, useMemo, useState } from "react";
import { User } from "@/Models/Common/User";
import useData from "@/Hooks/useData";
import { Roles } from "@/Constants/Types/RoleType";

export default function useApplicationPage(){

    const { getData, setData } = useData();
    const {goBack} = useNavigation();

    useEffect(() => {
        const me = getData.me().data as User;
        if(me.role_name !== Roles.ADMIN && me.role_name !== Roles.SYSADMIN) goBack();
    }, []);

    const list = getData.unusers().data as User[];

    const addUser = (id: number) => {
        setData.changeRoleUser.mutate({id: id, role: Roles.MINISTER});
    }

    const delUser = (id: number) => {
        setData.deleteUser.mutate(id);
    }

    const createContent = (value: User) => {
        return (
            <div>
                <div className={styles.element_info}>
                    <div className={styles.element_name}>{value.name}</div>
                    <div className={styles.element_contact}>{value.email}</div>
                </div>
                <button className={styles.element_icon} onClick={() => addUser(value.id)}>
                    <PlusIcon height="100%" width="100%" color="var(--accent-color)"/>
                </button>
                <button className={styles.element_icon} onClick={() => delUser(value.id)}>
                    <GarbageIcon height="100%" width="100%" color="var(--accent-color)"/>
                </button>
            </div>
        );
    }
    
    const head = <Header licon="arrow" lhandleClick={goBack} isBotton={true}>Заявки</Header>

    return [head, list, createContent] as const;
}