import './styles.css'
import Navigate from "../../components/navigate/Navigate";
import Header from "../../components/header/Header"
import { EditIcon } from "../../svg/edit"
import { UserIcon } from '../../svg/user';

import { useState, useRef } from "react";
import List from '../../components/list/List';

import useSessionStorage  from "../../hooks/useSessionStorage"
import ChosePanel from "../../components/chosePanel/ChosePanel";

const fcontent = {
    "Роли": {
        "Служитель": true,
        "Лидер": true,
        "Администратор": true
    },
    "Музыканты": {
        "Поющие": true,
        "Играющие": true
    },
    "Group": {
        "el1": true,
        "el2": true
    },
    "Some": {
        "s1": true,
        "s2": true
    }
}

function UserListPage(){
    const mainList = [
        {
            name: "User1",
            role: "Role"
        },
        {
            name: "User2",
            role: "Role"
        },
        {
            name: "User3",
            role: "Role"
        },
        {
            name: "User4",
            role: "Role"
        },
    ];

    const [list, setList] = useState(mainList);

    const updateList = (fil) =>{ // TODO
        // if(fil === "Все"){
        //     setList(mainList);
        // }
        // else if(fil === "Участие"){
        //     setList(mainList.filter(e => e.isPart));
        // }
        // else if(fil === "Мои"){
        //     setList(mainList.filter(e => e.isYour));                
        // }
    }

    const filterRef = useRef(null);

    
    const [filter, setFilter] = useSessionStorage("filter-users", fcontent, updateList);
    const prefFilter = useRef(filter);

    const checkUpdateList = () =>{
        if(prefFilter.current !== filter){
            prefFilter.current = filter;
            updateList(filter);
        }
    }

    const openFilter = () => {
        if(filterRef.current){
            filterRef.current.classList.add("show");
        }
    }
    
    const closeFilter = () => {
        if(filterRef.current){
            filterRef.current.classList.remove("show");
            checkUpdateList();
        }
    }

    const createContent = (value) => {
        return (
            <div>
                <div className='element-icon-user'>
                    {true &&
                        <UserIcon height="100%" width="100%" color='var(--accent-color)'/>
                    }
                </div>
                <div className="element-info-user">
                    <div className="element-name-user">{value.name}</div>
                    <div className="element-role-user">{value.role}</div>
                </div>
                <div className="element-type-users">
                    {true &&
                        <EditIcon  height="100%" width="100%" color='var(--accent-color)'/>
                    }
                </div>
            </div>
        );
    }

    return (
        <div className="container-users">
            <ChosePanel ref={filterRef} close={closeFilter} type="group"
                    handleSelect={setFilter} content={filter} top="70" right="10" height="400" width="230"/>
            <Header bicon="filter" bhandleClick={openFilter} isBotton="true">Участники</Header>
            <div className="contant-users">
                <List list={list} element={createContent}/>
                {true &&
                    <button className="btn-add-users">
                        Добавить
                    </button>
                }
            </div>
            <Navigate />
        </div>
    );
}

export default UserListPage;