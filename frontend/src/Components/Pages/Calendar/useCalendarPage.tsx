
import { Header } from "@/Components/Dummies/Header";
import { useState, useMemo, useRef, useEffect } from "react";
import { months } from "./constants";
import useRadioFilter from "@/Hooks/useRadioFilter";
import { OverflowPanel } from "@/Components/Wrapper/OverflowPanel";
import useNavigation from "@/Hooks/useNavigation";
import { Event } from "@/Models/Common/Event";
import useData from "@/Hooks/useData";


export default function useCalendarPage(getDate?: (date: string) => void){
    const {getData} = useData();
    const { goBack } = useNavigation();
    const today = new Date();
    const [date, setDate] = useState(new Date(today.getFullYear(), today.getMonth() + 1));

    const goBackWithCheck = () => {
        if(getDate){
            getDate('');
            return;
        }
        goBack();
    }

    const mainevent: Event[] = getData.events().data as Event[];
    const [events, setEvents] = useState<Event[]>([]);

    const updateList = (fil: string) =>{
        if(fil === "Все"){
            setEvents(mainevent);
        }
        else if(fil === "Участие"){
            setEvents(mainevent.filter(e => e.isPart));
        }
        else if(fil === "Мои"){
            setEvents(mainevent.filter(e => e.isYour));                
        }
    }

    const varFilter = ["Все", "Участие", "Мои"];
    const content = useMemo(() => ({filter:varFilter, initFilter:"Все", storageName:"filter-event", updateList:updateList}), []);
    const [filter, openFilter] = useRadioFilter(content);

    useEffect(() => {
        if(mainevent) setEvents(mainevent);
    }, [mainevent]);

    const datePanel = useRef<HTMLDivElement>(null);
    
    const closeDP = () => {
        if(datePanel.current){
            datePanel.current.classList.remove("show");
        }
    }
    const openDP = () => {
        if(datePanel.current){
            datePanel.current.classList.add("show");
        }
    }

    const head = <Header licon="arrow" lhandleClick={goBackWithCheck}
                    ricon="filter" rhandleClick={openFilter}
                    btext={months[date.getMonth()]} bhandleClick={openDP}
                    isBotton={true}>
                    Календарь
                 </Header>


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const month = parseInt(formData.get('month') as string);
        const year = parseInt(formData.get('year') as string);
        
        if (month && year) {
            setDate(new Date(year, month));
            closeDP();
        }
    };

    const selectDate = <OverflowPanel ref={datePanel} close={closeDP}>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
                                <input
                                type="number"
                                name="month"
                                min="1"
                                max="12"
                                defaultValue={date.getMonth()}
                                placeholder="Месяц (1-12)"
                                required
                                />
                                <input
                                type="number"
                                name="year"
                                min="2020"
                                max="2100"
                                defaultValue={date.getFullYear()}
                                placeholder="Год"
                                required
                                />
                                <button type="submit">Выбрать</button>
                            </form>
                        </OverflowPanel>

    return [head, filter, selectDate, date, events] as const;

}