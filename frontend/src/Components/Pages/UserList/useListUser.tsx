import { useRef, useState } from "react";
import { EditIcon, IconElements, UserIcon } from "@/Assets/icons";
import { Roles, User } from "./types";
import { RadioGroup } from '@/Components/Dummies/RadioGroup';
import { OverflowPanel } from '@/Components/Wrapper/OverflowPanel';
import styles from './UserListStyles.module.scss'
import DecorateButton from '@/Components/UI/DecorateButton';
import { FilterType } from "@/Hooks/useGroupFilter";

export default function useListUser(){

    const mainList: User[] = [
        {
            name: "User1",
            role: Roles.MINISTER,
            spec: {
                "Музыканты": [
                    "Поющие",
                    "Играющие",
                ],
                "Group": [
                    "el2"
                ],
            }
        },
        {
            name: "User2",
            role: Roles.LEADER,
            spec: {
                "Музыканты": [
                    "Поющие",
                    "Играющие",
                ],
                "Group": [
                    "el1",
                    "el2"
                ],
                "Some": [
                    "s1",
                    "s2"
                ]
            }
        },
        {
            name: "User3",
            role: Roles.ADMIN,
            spec: {
                "Музыканты": [
                    "Поющие"
                ]
            }
        },
        {
            name: "User4",
            role: Roles.SYSADMIN,
            spec: {
                "Group": [
                    "el1"
                ]
            }
        },
    ];

    const [list, setList] = useState<User[]>(mainList);

    const roles = [Roles.MINISTER, Roles.LEADER, Roles.ADMIN];
    const [curRole, setRole] = useState<string>(roles[0]);
    const startRole = useRef<string>(null);
    const startUser = useRef<User>(null);
    const editPanel = useRef<HTMLDivElement>(null);
    const wrapperEditPanel = useRef<HTMLDivElement>(null);

    function editRole(name: string, content: boolean){
        if(content){
            setRole(name);
        }
    }

    function closeEditPanel(){
        if(editPanel.current){
            if(startRole.current !== curRole){
                setList(prevUsers => 
                    prevUsers.map(user => 
                        user === startUser.current ? { ...user, role: curRole as Roles} : user
                    )
                );
            }
            editPanel.current.classList.remove("show");
        }
    }
    
    function openEditPanel(user: User, event: React.MouseEvent<HTMLButtonElement>){
        startUser.current = user;
        startRole.current = user.role;
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
            alert("Удаление " + startUser.current.name)
        }
    }

    const updateList = (fil: FilterType) => {
        // Всегда начинаем с полного списка
        let filteredList = [...mainList];
        let result: User[] = [];
        let sel = 0;
        
        // Применяем фильтры последовательно
        Object.entries(fil).forEach(([key, value]) => {
            if (key === "Роли") {
                // Фильтрация по ролям: оставляем только те роли, которые активны
                const activeRoles = Object.entries(value)
                    .filter(([_, isActive]) => isActive)
                    .map(([role]) => role);
                
                // Если есть активные роли, фильтруем по ним
                if (activeRoles.length > 0) {
                    filteredList = filteredList.filter(user => 
                        activeRoles.includes(user.role)
                    );
                }
                // Если нет активных ролей - ничего не делаем (оставляем всех)
                
            } else {
                // Фильтрация по специализациям
                // Собираем все активные специализации
                const activeSpecs = Object.entries(value)
                    .filter(([_, isActive]) => isActive === true)
                    .map(([spec]) => spec);

                sel += activeSpecs.length;
                
                // Если есть активные специализации, фильтруем
                if (activeSpecs.length > 0) {
                    filteredList.forEach(user => {
                        // Пользователь подходит, если у него есть хотя бы одна активная специализация
                        if( activeSpecs.some((spec) => 
                            user.spec[key] && 
                            user.spec[key].includes(spec))){
                            if(!result.some(u => u.name === user.name)) result.push(user);
                        }
                    })
                }
                // Если нет активных специализаций - ничего не делаем
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
                    <div className={styles.element_role}>{value.role}</div>
                </div>
                {value.role !== Roles.SYSADMIN &&
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
                <RadioGroup content={roles} managerTrigger={curRole} handleSelect={setRole}/>
                <DecorateButton onClick={deleteUser}>Удалить</DecorateButton>
            </OverflowPanel>
        </div>
    
    return [list, createContent, updateList, editContent] as const;
}