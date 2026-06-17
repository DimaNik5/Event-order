
import InfoLayout from "@/Components/Layouts/InfoLayout/InfoLayout";
import BackgroundPanel from "@/Components/Wrapper/BackgroundPanel";
import { List } from "@/Components/Wrapper/List";
import styles from './ApplicationPageStyles.module.scss'
import useApplicationPage from "./useApplicationPage";


export default function ApplicationPage(){
    const [head, list, createContent] = useApplicationPage();

    return(
        <InfoLayout header={head}>
            <BackgroundPanel>
                <List list={list} content={createContent}/>
            </BackgroundPanel>
            <div className={styles.space}></div>
        </InfoLayout>
    );
}