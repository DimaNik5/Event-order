
import { useEffect, useState } from "react";
import useNavigation from "@/Hooks/useNavigation";
import { Header } from "@/Components/Dummies/Header";
import DecoratedInput from "@/Components/Dummies/DecoratedInput";
import styles from './EditPageStyles.module.scss'
import { useParams } from "react-router-dom";
import useData from "@/Hooks/useData";
import { Page } from "@/Models/Common/Page";
import { PagesOfEvent } from "@/Models/Common/PagesOfEvent";


export default function useEditPage(){
    const {goBack} = useNavigation();
    const {getData, setId, setData} = useData();

    const update = setData.updatePage;
    useEffect(() => {
        if(update.isSuccess){
            goBack();
        }
    }, [update.isSuccess]);
    
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : undefined;
    const { id_page } = useParams<{ id_page: string }>();
    const numericId_page = id_page ? parseInt(id_page, 10) : undefined;

    if(numericId === undefined || numericId_page === undefined){
        goBack();
    }

    useEffect(() => {
        if(numericId){
            setId(numericId);
        }
    }, [numericId]);
    const pages = getData.pages().data as Page[];
    const [page, setPage] = useState<Page>({name: "", description: ""} as Page);

    useEffect(() => {
        if(numericId_page && numericId_page > 0 && pages){
            const p = pages.find(pp => pp.id === numericId_page);
            if(p){
                setPage(p);
            }
            else{
                goBack();
                return;
            }
        }
    }, [pages]);


    const [content, setContent] = useState({"Название": 'Описание', "content": ""});

    useEffect(() => {
        if(page){
            setContent({"Название": page.name, "content": page.description})
        }
    }, [page]);
    
    const save = () => {
        if(content.Название === page.name && content.content === page.description){
            return;
        }
        console.log(content);
        const newP: Page = {
            ...page,
            name: content.Название,
            description: content.content
        }
        update.mutate(newP);
    }

    const head = <Header licon="arrow" lhandleClick={goBack}
                         bicon="save" bhandleClick={save}
                         isBotton={true}>Редактирование</Header>

    const setCon = (name: string, cont: string) => {
        setContent((prev) => ({
            ...prev,
            [name]: cont
        }))
    }


    const inputContent= 
        <div className={styles.input_content}>
            <DecoratedInput content={content.Название} name="Название" callback={setCon} maxLength={50}/>
        </div>

    return [head, inputContent, content.content, (con: string) => setCon("content", con)] as const;

}