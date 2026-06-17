
import { useState } from "react";
import useNavigation from "@/Hooks/useNavigation";
import { Header } from "@/Components/Dummies/Header";
import DecoratedInput from "@/Components/Dummies/DecoratedInput";
import styles from './EditPageStyles.module.scss'


export default function useEditPage(){
    const {goBack} = useNavigation();

    const [content, setContent] = useState({"Название": 'Описание', "content": ""});
    
    const save = () => {

        goBack();
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

    return [head, inputContent, save] as const;

}