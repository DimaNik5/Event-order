
import useNavigation from "@/Hooks/useNavigation";
import styles from './EditPagesOfEventPageStyles.module.scss'
import { Header } from "@/Components/Dummies/Header";
import { useEffect, useMemo, useState } from "react";
import useData from "@/Hooks/useData";
import { useParams } from "react-router-dom";
import { PagesOfEvent } from "@/Models/Common/PagesOfEvent";
import { Page } from "@/Models/Common/Page";
import { Event } from "@/Models/Common/Event";

export default function useEditPagesOfEventPage(){
    const {goBack, goTo} = useNavigation();
    const {getData, setId} = useData();
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : undefined;
    
    useEffect(() => {
        if (numericId && numericId > 0) {
            setId(numericId);
        } else {
            goBack();
        }
    }, [numericId]);

    const pagesInfo = getData.pages().data as Page[];

    const [pages, setPages] = useState<Page[]>([]);

    useEffect(() => {
        if(pagesInfo){
            setPages(pagesInfo);
        }
    }, [pagesInfo]);

    const createContent = (value: Page) => {
        return (
            <div>
                <div className={styles.element_info} onClick={() => goTo(`edit/${value.id}`)}>
                    <div className={styles.element_name}>{value.name}</div>
                </div>
            </div>
        );
    }
    
    const head = <Header licon="arrow" lhandleClick={goBack} isBotton={true}>Страницы</Header>

    const handleaddPage = () => {
        goTo('edit/-1');
    }

    return [head, pages, createContent, handleaddPage] as const;
}