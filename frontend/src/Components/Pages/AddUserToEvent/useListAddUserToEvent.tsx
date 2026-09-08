import { useMemo, useState } from "react";
import { PlusIcon, UserIcon } from "@/Assets/icons";
import styles from './AddUserToEventStyles.module.scss'
import { FilterType } from "@/Hooks/useGroupFilter";
import { User } from "@/Models/Common/User";
import useData from "@/Hooks/useData";
import { useParams } from "react-router-dom";
import useNavigation from "@/Hooks/useNavigation";
import { Specialisation } from "@/Models/Common/Specialisation";

export default function useListAddUserToEvent(){
    const {goBack} = useNavigation()
    const {getData, setId, setData} = useData();
    const users = getData.users().data as User[];

    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : undefined;
    if(numericId === undefined) goBack();

    setId(numericId ?? -1)
    const usersOfEvent = getData.usersOfEvent().data as number[];

    const mainList = useMemo(() => {
        return users.filter(u => !usersOfEvent.some(ue => ue === u.id))
    }, [users, usersOfEvent]);

    const [list, setList] = useState<User[]>(mainList);

    // const roles = [Roles.MINISTER, Roles.LEADER, Roles.ADMIN];
    // const [curRole, setRole] = useState<string>(roles[0]);
    // const editPanel = useRef<HTMLDivElement>(null);
    // const wrapperEditPanel = useRef<HTMLDivElement>(null);

    const updateList = (fil: FilterType) => {
        // Всегда начинаем с полного списка
        let filteredList = [...mainList];
        let result: User[] = [];
        let sel = 0;
    
        const specialisation = getData.spec().data as Specialisation[];
        
        // Создаем карту для быстрого поиска специализаций по id
        const specMap = new Map<number, Specialisation>();
        specialisation.forEach(spec => {
            specMap.set(spec.id, spec);
        });
        
        // Применяем фильтры последовательно
        Object.entries(fil).forEach(([key, value]) => {
            if (key === "Роли") {
                // Фильтрация по ролям
                const activeRoles = Object.entries(value)
                    .filter(([_, isActive]) => isActive)
                    .map(([role]) => role);
                
                if (activeRoles.length > 0) {
                    filteredList = filteredList.filter(user => 
                        activeRoles.includes(user.role_name)
                    );
                }
            } else {
                // Фильтрация по специализациям
                const activeSpecs = Object.entries(value)
                    .filter(([_, isActive]) => isActive === true)
                    .map(([spec]) => spec);
    
                sel += activeSpecs.length;
                
                if (activeSpecs.length > 0) {
                    const activeSpecsSet = new Set(activeSpecs);
                    
                    filteredList.forEach(user => {
                        // Проверяем, есть ли у пользователя массив специализаций
                        if (!user.spec || user.spec.length === 0) return;
                        
                        // Проверяем каждую специализацию пользователя
                        const hasMatchingSpec = user.spec.some(specId => {
                            // Получаем специализацию по id
                            const userSpec = specMap.get(specId);
                            
                            // Проверяем, соответствует ли специализация фильтру
                            if (!userSpec || userSpec.name !== key) return false;
                            
                            // Проверяем, есть ли активные spec внутри специализации
                            return userSpec.spec?.some(s => 
                                activeSpecsSet.has(s.name)
                            ) ?? false;
                        });
                        
                        // Если пользователь подходит, добавляем в результат
                        if (hasMatchingSpec && !result.some(u => u.name === user.name)) {
                            result.push(user);
                        }
                    });
                }
            }
        });
        
        setList(sel > 0 ? result : filteredList);
    };

    const addUser = (value: User) => {
        setData.addUserToEvent.mutate({id_event: numericId, id_user: value.id});
    }

    const createContent = (value: User) => {
        return (
            <div>
                <div className={styles.element_icon}>
                    {true &&
                        <UserIcon height="100%" width="100%" color="var(--accent-color)"/>
                    }
                </div>
                <div className={styles.element_info}>
                    <div className={styles.element_name}>{value.name}</div>
                    <div className={styles.element_role}>{value.role_name}</div>
                </div>
                <div className={styles.element_type} onClick={() => addUser(value)}>
                    <PlusIcon />
                </div>
            </div>
        );
    }
    
    return [list, createContent, updateList] as const;
}