import { useEffect, useRef, useState } from "react";
import { EditIcon, IconElements, UserIcon } from "@/Assets/icons";
import { RadioGroup } from '@/Components/Dummies/RadioGroup';
import { OverflowPanel } from '@/Components/Wrapper/OverflowPanel';
import styles from './UserListStyles.module.scss'
import DecorateButton from '@/Components/UI/DecorateButton';
import { FilterType } from "@/Hooks/useGroupFilter";
import { User } from "@/Models/Common/User";
import { Roles } from "@/Constants/Types/RoleType";
import useData from "@/Hooks/useData";
import { Specialisation } from "@/Models/Common/Specialisation";

export default function useListUser(){
    const {getData, setData} = useData();
    
    const me = getData.me(). data as User;
    const specialisation = getData.spec().data as Specialisation[];
    const [mainList, setMainList] = useState<User[]>([]);

    const [list, setList] = useState<User[]>([]);
    const users = getData.users().data as User[];

    useEffect(() => {
        if(users) {
            setMainList(users);
            setList(users);
        }
    }, [users]);

    const roles = [Roles.MINISTER, Roles.LEADER, Roles.ADMIN];
    const [curRole, setRole] = useState<string>(roles[0]);
    const startRole = useRef<string>(null);
    const startUser = useRef<User>(null);
    const editPanel = useRef<HTMLDivElement>(null);
    const wrapperEditPanel = useRef<HTMLDivElement>(null);

    function editRole(name: string, content: boolean){
        if(content && startUser.current){
            setData.changeRoleUser.mutate({id: startUser.current.id, name});
            setRole(name);
        }
    }

    function closeEditPanel(){
        if(editPanel.current){
            if(startRole.current !== curRole){
                setList(prevUsers => 
                    prevUsers?.map(user => 
                        user === startUser.current ? { ...user, role_name: curRole as Roles} : user
                    )
                );
            }
            editPanel.current.classList.remove("show");
        }
    }
    
    function openEditPanel(user: User, event: React.MouseEvent<HTMLButtonElement>){
        startUser.current = user;
        startRole.current = user.role_name;
        setRole(startRole.current);
        const rect = event.currentTarget.getBoundingClientRect();
        if(editPanel.current){
            if(wrapperEditPanel.current){
                wrapperEditPanel.current.style.left = `calc(${rect.right}px - 190px)`;
                wrapperEditPanel.current.style.top = `${rect.top}px`;
            }
            editPanel.current.classList.add("show");
        }

    }

    function deleteUser(){
        if(startUser.current){
            setData.deleteUser.mutate(startUser.current.id)
        }
    }

    const updateList = (fil: FilterType) => {
        // Всегда начинаем с полного списка
        let filteredList = [...mainList];
        let result: User[] = [];
        let sel = 0;
        
        // Создаем карту для быстрого поиска специализаций по id
        const specMap = new Map<number, Specialisation>();
        specialisation?.forEach(spec => {
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
                {(value.role_name !== Roles.SYSADMIN && (me && (me.role_name === Roles.ADMIN || me.role_name === Roles.SYSADMIN))) &&
                    <button className={styles.element_type} onClick={(e) => openEditPanel(value, e)}>
                        {<EditIcon height="100%" width="100%" color="var(--accent-color)"/>}
                    </button>
                }
            </div>
        );
    }

    const editContent = 
        <div ref={wrapperEditPanel} className={styles.edit_panel}>
            <OverflowPanel ref={editPanel} close={closeEditPanel}>
                <RadioGroup content={roles} managerTrigger={curRole} handleSelect={editRole}/>
                <DecorateButton onClick={deleteUser}>Удалить</DecorateButton>
            </OverflowPanel>
        </div>
    
    return [list, createContent, updateList, editContent] as const;
}