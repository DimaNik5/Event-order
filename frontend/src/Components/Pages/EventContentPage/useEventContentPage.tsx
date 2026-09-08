
import useNavigation from "@/Hooks/useNavigation";
import { Header } from "@/Components/Dummies/Header";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import CommentButton from "@/Components/Widgets/CommentButton";
import useData from "@/Hooks/useData";
import { Event } from "@/Models/Common/Event";
import { PagesOfEvent } from "@/Models/Common/PagesOfEvent";
import { Page } from "@/Models/Common/Page";
import { User } from "@/Models/Common/User";

export default function useEventContentPage(){
    const {getData, setId} = useData();
    const {goBack, goTo} = useNavigation();
    
    const { id } = useParams<{ id: string }>();
    
    const [event, setEvent] = useState<Event>({} as Event);
    const [pages, setPages] = useState<Page[]>([]);
    const [my, setMy] = useState(false);

    const me = getData.me().data as User;
    const events = getData.events().data as Event[];
    
    useEffect(() => {
        const numericId = id ? parseInt(id, 10) : -1;
        setId(numericId);
    }, [id]);

    // Получаем страницы после установки id
    const pagesInfo = getData.pages().data as Page[];

    // Поиск события
    useEffect(() => {
        const numericId = id ? parseInt(id, 10) : undefined;
        
        if(numericId === undefined || !events) {
            return;
        }
        
        const foundEvent = events.find(e => e.id === numericId);
        
        if(!foundEvent) {
            goBack();
            return;
        }
        
        if(!foundEvent.isPart) {
            goBack();
            return;
        }
        
        setEvent(foundEvent);
    }, [id, events]);

    // Установка страниц
    useEffect(() => {
        if(pagesInfo) {
            setPages(pagesInfo);
        }
    }, [pagesInfo]);
    
    useEffect(() => {
        const numericId = id ? parseInt(id, 10) : undefined;
        if(numericId !== undefined && events && pagesInfo){
            setEvent(events.find(e => e.id === numericId) as Event);
            if(event && Object.keys(event).length > 0){
                if(!event.isPart) {
                    goBack();
                    return;
                }
                setPages(pagesInfo);

            }
            else {
                goBack();
                return;
            }
        }
        else {
            return;
        }
    }, [id, events, pagesInfo]);
    
    useEffect(() => {
        if(me && event && Object.keys(event).length > 0){
            setMy(me.id === event.author)
        }
    }, [me, event]);
    
    const head = (
        <Header 
            licon="arrow" 
            lhandleClick={goBack}
            ricon={my ? "edit" : undefined} 
            rhandleClick={my ? () => goTo('edit') : undefined}
            bicon="user" 
            bhandleClick={() => goTo('users')}
            isBotton={true}
        >
            {event.name}
        </Header>
    );
    
    const comment = <CommentButton onClick={() => goTo('comment')}/>

    return [head, pages, comment] as const;
}