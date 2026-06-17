
import styles from './EventPageStyles.module.scss'

import { MainLayout } from "@/Components/Layouts/MainLayout";
import { List } from "@/Components/Wrapper/List";
import DecorateButton from "@/Components/UI/DecorateButton";
import BackgroundPanel from "@/Components/Wrapper/BackgroundPanel";
import useEventPage from "./useEventPage";
import useNavigation from '@/Hooks/useNavigation';



export default function EventPage(){
    const {goTo} = useNavigation();
    const [head, filter, list, createContent, clikOnElement] = useEventPage();

    return (
        <MainLayout header={head}>
            <div className={styles.panel}>
                {filter}
            </div>
            
            <BackgroundPanel>
                <List list={list} content={createContent} onClick={clikOnElement}/>
                {true &&
                    <DecorateButton onClick={() => goTo('create')}>Добавить</DecorateButton>
                }
            </BackgroundPanel>
        </MainLayout>
    );
}