
import useNavigation from "@/Hooks/useNavigation";
import styles from './EditPagesOfEventPageStyles.module.scss'
import { Header } from "@/Components/Dummies/Header";
import { useState } from "react";

export default function useEditPagesOfEventPage(){
    const {goBack, goTo} = useNavigation();

    const mainlist: string[] = ["Описание", "стр", "чтото"]

    const [list, setList] = useState(mainlist);

    const createContent = (value: string) => {
        return (
            <div>
                <div className={styles.element_info} onClick={() => goTo('edit/1')}>
                    <div className={styles.element_name}>{value}</div>
                </div>
            </div>
        );
    }
    
    const head = <Header licon="arrow" lhandleClick={goBack} isBotton={true}>Страницы</Header>

    const handleaddPage = () => {
        goTo('edit/1');
    }

    return [head, list, createContent, handleaddPage] as const;
}