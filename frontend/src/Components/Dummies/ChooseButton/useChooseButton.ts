
import { useEffect, useState } from 'react';
import { Props, TypeButton } from './types';
import { SelectedType } from '@/Components/UI/SelectButton';

export default function useChooseButton(props: Props){
    const [selected, setSelected] = useState<SelectedType>(0);

    const [state, setState] = useState({
        name: "",
        radio: false,
        checkbox: false
    });

    useEffect (() => {
        setState(prev => ({
            ...prev,
            name: props.children,
            radio: props.type === TypeButton.RADIO,
            checkbox: props.type === TypeButton.CHECKBOX
        }));
        if(props.type === TypeButton.RADIO){
            if(props.current ===  props.children){
                setSelected(SelectedType.RADIO_ON);
            }
            else{
                setSelected(SelectedType.OFF);
            }
        }
    }, []);

    useEffect(() => {
        if(state.radio){
            if(props.current === state.name){
                setSelected(SelectedType.RADIO_ON);
            }
            else{
                setSelected(SelectedType.OFF);
            }
        }
        else if(state.checkbox){
            setSelected(props.selected ? SelectedType.CHECKBOX_ON : SelectedType.OFF);
        }
    }, [props.current, props.selected]);

    const click = () => {
        if(selected){
            if(state.checkbox){
                setSelected(SelectedType.OFF);
                props.handleClick(state.name, false);
            }
        }
        else{
            if(state.checkbox){
                setSelected(SelectedType.CHECKBOX_ON);
            } else {
                setSelected(SelectedType.RADIO_ON)
            }
            props.handleClick(state.name, true);
        }
    };

    return [selected, state, click] as const;

}