import './styles.css'

import {RhombIcon} from '../../svg/rhomb'
import {CheckmarkIcon} from '../../svg/checkmark'
import { useEffect, useState } from 'react';

/*
    type - radio/checkbox
    current
    handleClick
    selected
*/
export default function ChoseButton(props){
    const [selected, setSelected] = useState(props.selected ?? false);

    const [state, setState] = useState({
        name: "",
        radio: false,
        checkbox: false
    });

    useEffect (() => {
        setState(prev => ({
            ...prev,
            name: props.children,
            radio: props.type === "radio",
            checkbox: props.type === "checkbox"
        }));
        if(props.type === "radio"){
            if(props.current ===  props.children){
                setSelected(true);
            }
            else{
                setSelected(false);
            }
        }
    }, []);

    useEffect(() => {
        if(state.radio){
            if(props.current === state.name){
                setSelected(true);
            }
            else{
                setSelected(false);
            }
        }
        else if(state.checkbox){
            if(props.current === "on") setSelected(true);
            else if(props.current === "off") setSelected(false);
        }
    }, [props.current]);

    const click = () => {
        if(selected){
            if(state.checkbox){
                setSelected(false);
                props.handleClick(state.name, false);
            }
        }
        else{
            setSelected(true);
            props.handleClick(state.name, true);
        }
    };

    return (
        <div className="container-chose">
            <div className='btn-chose'>
                <button onClick={click}>
                    <RhombIcon width="100%" height="100%" color='#fff'/>
                </button>
                {(selected && state.radio) &&
                    <div className='radio-set-chose'></div>
                }
                {(selected && state.checkbox) &&
                    <div className='check-set-chose'>
                        <CheckmarkIcon width="95%" height="95%" color='#fff'/>
                    </div>
                }
            </div>
            <div className='content-chose'>{state.name}</div>
        </div>
    );
}