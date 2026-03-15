import {Header} from "@/Components/Dummies/Header";
import './styles.css'

import { MainLayout } from "@/Components/Layouts/MainLayout";



function EventPage(){
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

    const updateList = (fil) =>{
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

    const filterRef = useRef(null);

    const [filter, setFilter] = useSessionStorage("filter-event","Все", updateList);
    const prefFilter = useRef(filter);
    const varFilter = ["Все", "Участие", "Мои"];

    const changeFilter = (name, flag) => {
        if(flag){
            setFilter(name);
        }
    }

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
                <div className="element-info-event">
                    <div className="element-name-event">{value.name}</div>
                    <div className="element-some-info-event">{value.date}</div>
                    <div className="element-some-info-event">Участников: {value.numbers}</div>
                </div>
                <div className="element-type-event">
                    {value.isPart &&
                        (value.isYour ? <PenIcon  height="100%" width="100%" color='var(--accent-color)'/> 
                                        : <UserIcon  height="100%" width="100%" color='var(--accent-color )'/>)
                    }
                </div>
            </div>
        );
    }

    return (
        <MainLayout>
            <ChooseButton ref={filterRef} close={closeFilter} type="radio" content={varFilter}
                        handleSelect={changeFilter} selected={filter} top="70" right="10" height="150" width="150"/>
            <Header licon="calendar" lhandleClick={alert}
                    ricon="bell" rhandleClick={alert}
                    bicon="filter" bhandleClick={openFilter}
                    isBotton={true}>
                События
            </Header>
            <div className="content-event">
                <List list={list} element={createContent}/>
                {true &&
                    <button className="btn-add-event">
                        Добавить
                    </button>
                }
            </div>
        </MainLayout>
    );
}

export default EventPage;