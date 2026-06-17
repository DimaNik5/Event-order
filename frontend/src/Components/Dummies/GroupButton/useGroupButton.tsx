
import { useEffect, useRef, useState } from 'react';
import type {ListType, Props} from './types'
import { ChooseButton, TypeButton}  from '@/Components/Dummies/ChooseButton'
import { SelectedType } from '@/Components/UI/SelectButton';

export default function useGroupButton(props: Props){
    const [isOpen, setIsOpen] = useState(false); // флаг открытия
    const [lvlSet, setLvlSet] = useState(SelectedType.CHECKBOX_ON); // 0 - ни один, 1 - не все, 2 - все выбран

    const hasSomeFalse = (list: ListType) => {
        return Object.values(list).some(value => value === false);
    }
    const hasSomeTrue = (list: ListType) => {
        return Object.values(list).some(value => value === true);
    }

    useEffect(() => {
        if(hasSomeFalse(props.content)){
            if(hasSomeTrue(props.content)) setLvlSet(SelectedType.RADIO_ON);
            else setLvlSet(SelectedType.OFF);
        }
        else setLvlSet(SelectedType.CHECKBOX_ON);
    }, [props.content]);

    const clickOnElement = (name: string, flag: boolean) => {
        const newList = {
            ...props.content,
            [name]: flag
        };
        props.handleSetList(newList);
    }

    const click = () => {
        const newState = { ...props.content };
        Object.keys(newState).forEach(key => {
            newState[key] = lvlSet !== SelectedType.CHECKBOX_ON;
        });
        props.handleSetList(newState);
    }

    const content = Object.keys(props.content).map((key) => {
        return <ChooseButton key={key} selected={props.content[key]}
                type={TypeButton.CHECKBOX} unpresseble={props.unpresseble}
                handleClick={(name: string, flag: boolean) => !props.unpresseble && clickOnElement(name, flag)}>{key}</ChooseButton>
    });

    return [content, lvlSet, isOpen, setIsOpen, click] as const;
}