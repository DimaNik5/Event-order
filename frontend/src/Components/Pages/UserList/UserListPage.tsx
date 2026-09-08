import styles from './UserListStyles.module.scss'
import { MainLayout } from '@/Components/Layouts/MainLayout';
import BackgroundPanel from '@/Components/Wrapper/BackgroundPanel';
import { List } from '@/Components/Wrapper/List';
import DecorateButton from '@/Components/UI/DecorateButton';
import useUserList from './useUserList';
import useNavigation from '@/Hooks/useNavigation';



export default function UserListPage(){
    const {goTo} = useNavigation();

    const [head, fcontent, editContent, list, createContent, addF] = useUserList();

    return (
        <MainLayout header={head}>
            {editContent}
            <div className={styles.panel}>
                {fcontent}
            </div>
            <BackgroundPanel>
                <List list={list} content={createContent}/>
                {addF &&
                    <DecorateButton onClick={() => goTo('application')}>
                        Добавить
                    </DecorateButton>
                }
            </BackgroundPanel>
        </MainLayout>
    );
}
