import { useParams } from 'react-router-dom';
import { Header } from "@/Components/Dummies/Header";
import useNavigation from "@/Hooks/useNavigation";
import styles from "./EditUserPageStyles.module.scss"
import ResizablePanel from '@/Components/Wrapper/ResizablePanel';
import { EmailIcon, PhoneIcon, UserIcon } from '@/Assets/icons';
import DecoratedText from '@/Components/Dummies/DecoratedText';
import DecorateButton from '@/Components/UI/DecorateButton';
import { EditIcon } from '@/Assets/icons';
import { useRef, useState } from 'react';
import DecoratedInput from '@/Components/Dummies/DecoratedInput';


export default function useEditUserPage(){
    
    const {goBack} = useNavigation();
    const head = <Header licon="arrow" lhandleClick={goBack} isBotton={false}>Редактирование</Header>

    const [info, setInfo] = useState({
        "Имя": "Имя",
        "Почта": "Почта",
        "Телефон": "+71234567890",
    })

    const setCon = (name: string, cont: string) => {
        setInfo((prev) => ({
            ...prev,
            [name]: cont
        }))
    }

    const content = <div className={styles.container}><ResizablePanel>
            <DecoratedInput name='Имя' callback={setCon} maxLength={130} content={info["Имя"]}
                icon={<UserIcon height="90%" width="90%" color='var(--info-color)'/>}/>
            <DecoratedInput name='Почта' callback={setCon} maxLength={254} content={info["Почта"]}
                icon={<EmailIcon height="90%" width="90%" color='var(--info-color)'/>}/>
            <DecoratedInput name='Телефон' callback={setCon} maxLength={11} content={info["Телефон"]}
                icon={<PhoneIcon height="90%" width="90%" color='var(--info-color)'/>}/>
            <DecorateButton onClick={() => alert('save')}>Сохранить</DecorateButton>
        </ResizablePanel>
    </div>

    return [
        head,
        content
    ] as const;
}