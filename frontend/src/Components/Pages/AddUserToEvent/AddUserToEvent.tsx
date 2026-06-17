import styles from './AddUserToEventStyles.module.scss'
import BackgroundPanel from '@/Components/Wrapper/BackgroundPanel';
import { List } from '@/Components/Wrapper/List';
import useAddUserToEventList from './useAddUserToEventList';
import InfoLayout from '@/Components/Layouts/InfoLayout/InfoLayout';



export default function AddUserToEvent(){

    const [head, fcontent, list, createContent] = useAddUserToEventList();

    return (
        <InfoLayout header={head}>
            <div className={styles.panel}>
                {fcontent}
            </div>
            <BackgroundPanel>
                <List list={list} content={createContent}/>
            </BackgroundPanel>
            <div className={styles.space}></div>
        </InfoLayout>
    );
}
