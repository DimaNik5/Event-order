
import useNavigation from "@/Hooks/useNavigation";
import styles from './UsersOfEventPageStyles.module.scss'
import { ExitIcon, GarbageIcon } from "@/Assets/icons";
import { Header } from "@/Components/Dummies/Header";
import { useEffect, useMemo, useState } from "react";
import { User } from "@/Models/Common/User";
import useData from "@/Hooks/useData";
import { useParams } from "react-router-dom";
import { Event } from "@/Models/Common/Event";

export default function useApplicationPage(){
    const {goBack, goTo} = useNavigation();
    const {getData, setData} = useData();

    const me = getData.me().data as User;

    const events = getData.events().data as Event[];
    
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : undefined;
    const event = useMemo(() => events.find(e => e.id === numericId), [events]);
    const users = getData.users().data as User[];
    const usersOfEvent = getData.usersOfEvent().data as number[];

    const [list, setList] = useState<User[]>([]);

    useEffect(() => {
        if(users && usersOfEvent){
            const t = users.filter(u => usersOfEvent.some(ue => ue === u.id));
            setList(t);
        }
    }, [users, usersOfEvent]);

    const delUser = (id: number) => {
        setData.delUserFromEvent.mutate({id_event: event?.id, id});
    }

    const createContent = (value: User) => {
        return (
            <div>
                <div className={styles.element_info}>
                    <div className={styles.element_name}>{value.name}</div>
                    <div className={styles.element_role}>{value.role_name}</div>
                </div>
                {(event?.author === me.id && value.id !== me.id) &&
                    <button className={styles.element_icon} onClick={() => delUser(value.id)}>
                        <GarbageIcon height="100%" width="100%" color="var(--accent-color)"/>
                    </button>
                }
                {value.id === me.id &&
                    <button className={styles.element_icon} onClick={() => delUser(value.id)}> 
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