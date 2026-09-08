
import ResizablePanel from '@/Components/Wrapper/ResizablePanel';
import DecoratedInput from '@/Components/Dummies/DecoratedInput';
import { EmailIcon, PasswordIcon, UserIcon } from '@/Assets/icons';
import DecorateButton from '@/Components/UI/DecorateButton';
import { useEffect, useState } from 'react';
import { SignType } from './types';
import useData from '@/Hooks/useData';
import { User } from '@/Models/Common/User';
import { Roles } from '@/Constants/Types/RoleType';
import useNavigation from '@/Hooks/useNavigation';
import { UserIn } from '@/Models/Common/UserIn';
import { UseQueryResult } from '@tanstack/react-query';



export default function useSignPage(){
    const {goTo} = useNavigation();

    const [signType, setSignType] = useState<SignType>(SignType.SIGN_IN);
    const [loginContent, setLoginContent] = useState(false);
    const init = {
        'почта': '',
        'пароль': '',
        'имя': '',
    }
    const [info, setInfo] = useState<Record<string, string>>(init);

    
    const validateFields = (): string => {

        // Проверка каждого поля
        Object.keys(info).forEach(key => {
            const value = info[key];
            
            // Проверка на пустые строки (только если поле обязательно)
            if (!value && key !== 'имя') {
                return 'Поле обязательно для заполнения: ' + key;
            }
            
            const pattern = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/;

            // Специфичные проверки по полям
            switch(key) {
                case 'почта':
                    // Проверка формата email
                    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if (!emailPattern.test(value)) {
                        return 'Некорректный формат email';
                    }
                    break;
                case 'пароль':
                    // Проверка длины пароля
                    if (value.length < 6) {
                        return 'Пароль должен содержать минимум 6 символов';
                    }
                    if (value.length > 50) {
                        return 'Пароль не должен превышать 50 символов';
                    }
                    if (!pattern.test(value)) {
                        return 'Пароль может содержать только буквы, пробелы, дефисы и апострофы';
                    }
                    break;

                case 'имя':
                    if(signType === SignType.SIGN_IN) break;
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


    const {setData, getData} = useData(); 
    const {data, isLoading} = getData.me() as {data: User, isLoading: boolean};

    useEffect(() => {
        console.log(data)
        if (!isLoading && data?.role_name && 
            (data.role_name as Roles) !== Roles.NONE) {
            console.log("go")
            goTo('event');
        }
    }, [isLoading]);


    function setContent(name: string, content: string){
        if (info[name] !== undefined) {
            setInfo(prev => ({
                ...prev,
                [name]: content.trim()
            }));
        }
    }

    function login(){
        const err = validateFields();
        if(err){
            alert(err);
            return;
        }
        const user: UserIn = {email: info['почта'], password: info['пароль']};
        setData.login.mutate(user);
        const er = setData.login.error;
        if(er) alert(er);
        else setLoginContent(true);
    }
    
    function register(){
        const err = validateFields();
        if(err){
            alert(err);
            return;
        }
        const user: UserIn = {name: info['имя'],email: info['почта'], password: info['пароль']};
        setData.logup.mutate(user);
        const er = setData.logup.error;
        if(er) alert(er);
        else setLoginContent(true);
    }

    const signInContent = <ResizablePanel>
        <DecoratedInput name='почта' callback={setContent} maxLength={254}
            icon={<EmailIcon height="90%" width="90%" color='var(--info-color)'/>}/>
        <DecoratedInput name='пароль' callback={setContent} maxLength={50}
            icon={<PasswordIcon height="100%" width="100%" color='var(--info-color)'/>}/>
        <DecorateButton onClick={login}>Вход</DecorateButton>
    </ResizablePanel>

    const signInBottomContent = <ResizablePanel clip="up">
        <DecorateButton clip='up' onClick={() => setSignType(SignType.SIGN_UP)}>Регестрация</DecorateButton>
    </ResizablePanel>

    const signUpContent = <ResizablePanel>
        <DecoratedInput name='имя' callback={setContent} maxLength={130}
            icon={<UserIcon height="100%" width="100%" color='var(--info-color)'/>}/>
        <DecoratedInput name='почта' callback={setContent} maxLength={254}
            icon={<EmailIcon height="90%" width="90%" color='var(--info-color)'/>}/>
        <DecoratedInput name='пароль' callback={setContent} maxLength={50}
            icon={<PasswordIcon height="100%" width="100%" color='var(--info-color)'/>}/>
        <DecorateButton onClick={register}>Зарегестрироваться</DecorateButton>
    </ResizablePanel>

    const signUpBottomContent = <ResizablePanel clip="up">
        <DecorateButton clip='up' onClick={() => setSignType(SignType.SIGN_IN)}>На вход</DecorateButton>
    </ResizablePanel>

    const content = loginContent ? <ResizablePanel>Подождите когда вас добавят<div><br></br></div></ResizablePanel>:
        signType === SignType.SIGN_IN ? 
        (
            <div>
                <div key="signin-wrapper">{signInContent}</div>
                <div key="signin-bottom-wrapper">{signInBottomContent}</div>
            </div>
        ) : (
            <div>
                <div key="signup-wrapper">{signUpContent}</div>
                <div key="signup-bottom-wrapper">{signUpBottomContent}</div>
            </div>
        );

    return [content] as const;
}