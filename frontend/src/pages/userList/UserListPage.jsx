import './styles.css'
import Navigate from "../../components/navigate/Navigate";
import Header from "../../components/header/Header"
import { EditIcon } from "../../svg/edit"
import { UserIcon } from '../../svg/user';

import { useState, useRef } from "react";
import List from '../../components/list/List';

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
            <Header bicon="filter" bhandleClick={alert} isBotton="true">Участники</Header>
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