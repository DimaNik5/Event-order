
import InfoLayout from "@/Components/Layouts/InfoLayout/InfoLayout";
import BackgroundPanel from "@/Components/Wrapper/BackgroundPanel";
import { List } from "@/Components/Wrapper/List";
import styles from './UsersOfEventPageStyles.module.scss'
import useUsersOfEventPage from "./useUsersOfEventPage";
import DecorateButton from "@/Components/UI/DecorateButton";


export default function UsersOfEventPage(){
    const [head, list, createContent, handleaddUser] = useUsersOfEventPage();

    return(
        <InfoLayout header={head}>
            <BackgroundPanel>
                <List list={list} content={createContent}/>
                <DecorateButton onClick={handleaddUser}>Добавить</DecorateButton>
            </BackgroundPanel>
            <div className={styles.space}></div>
        </InfoLayout>
    );
}