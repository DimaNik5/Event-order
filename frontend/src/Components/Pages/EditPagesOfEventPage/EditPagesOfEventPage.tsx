
import InfoLayout from "@/Components/Layouts/InfoLayout/InfoLayout";
import BackgroundPanel from "@/Components/Wrapper/BackgroundPanel";
import { List } from "@/Components/Wrapper/List";
import styles from './EditPagesOfEventPageStyles.module.scss'
import DecorateButton from "@/Components/UI/DecorateButton";
import useEditPagesOfEventPage from "./useEditPagesOfEventPage";


export default function EditPagesOfEventPage(){
    const [head, list, createContent, handleaddPage] = useEditPagesOfEventPage();

    return(
        <InfoLayout header={head}>
            <BackgroundPanel>
                <List list={list} content={createContent}/>
                <DecorateButton onClick={handleaddPage}>Добавить</DecorateButton>
            </BackgroundPanel>
            <div className={styles.space}></div>
        </InfoLayout>
    );
}