import { useParams } from 'react-router-dom';
import { Header } from "@/Components/Dummies/Header";
import useNavigation from "@/Hooks/useNavigation";
import styles from "./UserPageStyles.module.scss"
import ResizablePanel from '@/Components/Wrapper/ResizablePanel';
import { EmailIcon, PhoneIcon, UserIcon } from '@/Assets/icons';
import DecoratedText from '@/Components/Dummies/DecoratedText';
import DecorateButton from '@/Components/UI/DecorateButton';
import { EditIcon } from '@/Assets/icons';
import { useMemo, useRef } from 'react';
import useTheme from '@/Hooks/useTheme';
import useData from '@/Hooks/useData';
import { User } from '@/Models/Common/User';


export default function useUserPage(){
    const {getData} = useData();
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : undefined;

    const me = getData.me().data as User;
    const users = getData.users().data as User[];
    const user = useMemo(() => numericId === undefined ? me
            : users.find(u => u.id === numericId), [me, users]);

    const {changeTheme} = useTheme();

    const panelRef = useRef<HTMLDivElement>(null);

    const openPanel = () => {
        if(panelRef.current){
            panelRef.current.classList.add('show');
        }
    }

    const closePanel = () => {
        if(panelRef.current){
            panelRef.current.classList.remove('show');
        }
    }

    const panel = <div ref={panelRef} className={styles.panel}>
            <div className={styles.back} onClick={closePanel}></div>
            <div className={styles.panel_content}>
                <div onClick={() => goTo("edit")}>
                    <EditIcon color='white'/>
                    <div>Редактировать</div>
                </div>
                <div>
                    <EditIcon color='white'/>
                    <div>Выбрать фотографию</div>
                </div>
                <div onClick={changeTheme}>
                    <EditIcon color='white'/>
                    <div>Тема</div>
                </div>
            </div>
        </div>
    
    const {goBack, goTo} = useNavigation();
    const headsome = <Header licon="arrow" lhandleClick={goBack} isBotton={false}></Header>
    const headmy = <Header ricon="points" rhandleClick={openPanel} isBotton={false}></Header>

    const icon = <div className={styles.iconContainer}>
        <div className={styles.icon}>
            <div>
                <UserIcon height="100%" width="100%" color='white'/>
            </div>
        </div>
        <div className={styles.name}>
            <div>{user?.name}</div>
            <div>{user?.role_name}</div>
        </div>
    </div>

    const content = <div className={styles.container}><ResizablePanel>
            <DecoratedText content={user ? user.email : 'Почта'}
                icon={<EmailIcon height="90%" width="90%" color='var(--info-color)'/>}/>
            <DecoratedText content={user ? user.number : 'Телефон'}
                icon={<PhoneIcon height="100%" width="100%" color='var(--info-color)'/>}/>
            <DecorateButton onClick={() => goTo('spec')}>Специальности</DecorateButton>
        </ResizablePanel>
    </div>

    

    return [
        id !== undefined ? headsome : headmy,
        icon,
        content,
        panel
    ] as const;
}