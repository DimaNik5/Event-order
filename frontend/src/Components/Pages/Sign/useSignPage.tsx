
import ResizablePanel from '@/Components/Wrapper/ResizablePanel';
import DecoratedInput from '@/Components/Dummies/DecoratedInput';
import { EmailIcon, PasswordIcon, UserIcon } from '@/Assets/icons';
import DecorateButton from '@/Components/UI/DecorateButton';
import { useState } from 'react';
import { SignType } from './types';


export default function useSignPage(){
    const [signType, setSignType] = useState<SignType>(SignType.SIGN_IN);
    const [loginContent, setLoginContent] = useState(false);
    const init = {
        'почта': '',
        'пароль': '',
        'имя': '',
    }
    const [info, setInfo] = useState<Record<string, string>>(init);

    function setContent(name: string, content: string){
        if (info[name] !== undefined) {
            setInfo(prev => ({
                ...prev,
                [name]: content
            }));
        }
    }

    function login(){setLoginContent(true)}
    
    function register(){setLoginContent(true)}

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