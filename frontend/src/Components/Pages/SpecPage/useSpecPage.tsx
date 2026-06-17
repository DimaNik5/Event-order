
import { useState } from "react";
import useNavigation from "@/Hooks/useNavigation";
import { Header } from "@/Components/Dummies/Header";
import { IconElements } from "@/Assets/icons";
import DecoratedInput from "@/Components/Dummies/DecoratedInput";
import styles from './SpecPageStyles.module.scss'
import { useParams } from 'react-router-dom';
import { EmbeddedGroup } from "@/Components/Dummies/EmbeddedGroup";
import DecorateButton from "@/Components/UI/DecorateButton";

type SpecType = Record<string, Record<string, boolean>>;

export default function useSpecPage(){
    const {goBack} = useNavigation();
    const { id } = useParams<{ id: string }>();
    
    const [spec, setSpec] = useState<SpecType>({
        "Музыканты": {
            "Поющие": true,
            "Играющие": true
        },
        "Group": {
            "el1": true,
            "el2": true
        },
        "Some": {
            "s1": true,
            "s2": true
        },
        "Some1": {
            "s1": true,
            "s2": true
        },
        "Somew": {
            "s1": true,
            "s2": true
        },
        "Some3": {
            "s1": true,
            "s2": true
        }
    })


    const head = <Header licon="arrow" lhandleClick={goBack} isBotton={true}>{id !== undefined ? 'Специальности' : 'Мои специальности'}</Header>

    const updateSpec = (name: string, content: Record<string, boolean>) => {
        // if(id === undefined) alert('touch!');
        setSpec((prev: SpecType): SpecType => ({
            ...prev, 
            [name]: { 
                ...content 
            }
        }));
    }
    
    const cont = <EmbeddedGroup handleSelect={updateSpec} content={spec} unpresseble={id !== undefined}/>

    const savebtn = id !== undefined ? <div></div> : <DecorateButton onClick={() => alert('save')}>Сохранить</DecorateButton>

    return [head, cont, savebtn] as const;

}