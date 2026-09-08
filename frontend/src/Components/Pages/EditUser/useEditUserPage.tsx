import { useParams } from 'react-router-dom';
import { Header } from "@/Components/Dummies/Header";
import useNavigation from "@/Hooks/useNavigation";
import styles from "./EditUserPageStyles.module.scss"
import ResizablePanel from '@/Components/Wrapper/ResizablePanel';
import { EmailIcon, PhoneIcon, UserIcon } from '@/Assets/icons';
import DecoratedText from '@/Components/Dummies/DecoratedText';
import DecorateButton from '@/Components/UI/DecorateButton';
import { EditIcon } from '@/Assets/icons';
import { useEffect, useRef, useState } from 'react';
import DecoratedInput from '@/Components/Dummies/DecoratedInput';
import useData from '@/Hooks/useData';
import { User } from '@/Models/Common/User';


export default function useEditUserPage(){
    const {getData, setData} = useData();

    const me = getData.me().data as User;
    
    const {goBack} = useNavigation();
    const head = <Header licon="arrow" lhandleClick={goBack} isBotton={false}>Редактирование</Header>

    const [info, setInfo] = useState<Record<string, string>>({
        "Имя": "Имя",
        "Почта": "Почта",
        "Телефон": "+71234567890",
    });

    useEffect(() => {
        if(me){
            setInfo({
                "Имя": me.name,
                "Почта": me.email,
                "Телефон": me.number,
            });
        }
    }, [me]);

    const setCon = (name: string, cont: string) => {
        setInfo((prev) => ({
            ...prev,
            [name]: cont.trim()
        }))
    }

    const validateFields = (): string => {

        // Проверка каждого поля
        Object.keys(info).forEach(key => {
            const value = info[key];
            
            // Проверка на пустые строки (только если поле обязательно)
            if (!value && key !== 'Телефон') {
                return 'Поле обязательно для заполнения: ' + key;
            }
            
            const pattern = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/;

            // Специфичные проверки по полям
            switch(key) {
                case 'Почта':
                    // Проверка формата email
                    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if (!emailPattern.test(value)) {
                        return 'Некорректный формат email';
                    }
                    break;
                case 'Телефон':
                    // Проверка длины пароля
                    if (!/^\+7\d{10}$/.test(value)) {
                        return 'Некорректный телефон (+7XXXXXXXXXX)';
                    }
                    break;
                case 'Имя':
                    // Проверка длины имени
                    if (value.length < 2) {
                        return 'Имя должно содержать минимум 2 символа';
                    }
                    if (value.length > 130) {
                        return 'Имя не должно превышать 130 символов';
                    }
                    // Проверка что имя состоит только из букв, пробелов, дефисов и апострофов
                    if (!pattern.test(value)) {
                        return 'Имя может содержать только буквы, пробелы, дефисы и апострофы';
                    }
                    break;
            }
        });

        return '';
    };

    const save = () => {
        if(me){
            const err = validateFields();
            if(err){
                alert(err);
                return;
            }
            if(me.email === info["Почта"] && me.name === info["Имя"] && me.number === info["Телефон"]) return;

            const newMe: User = {
                ...me,
                name: info["Имя"],
                email: info["Почта"],
                number: info["Телефон"],
            };
            setData.me.mutate(newMe);
        }
    }

    const content = <div className={styles.container}><ResizablePanel>
            <DecoratedInput name='Имя' callback={setCon} maxLength={130} content={info["Имя"]}
                icon={<UserIcon height="90%" width="90%" color='var(--info-color)'/>}/>
            <DecoratedInput name='Почта' callback={setCon} maxLength={254} content={info["Почта"]}
                icon={<EmailIcon height="90%" width="90%" color='var(--info-color)'/>}/>
            <DecoratedInput name='Телефон' callback={setCon} maxLength={11} content={info["Телефон"]}
                icon={<PhoneIcon height="90%" width="90%" color='var(--info-color)'/>}/>
            <DecorateButton onClick={save}>Сохранить</DecorateButton>
        </ResizablePanel>
    </div>

    return [
        head,
        content
    ] as const;
}