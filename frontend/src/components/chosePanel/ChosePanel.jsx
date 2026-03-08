import './styles.css'

import { useEffect, useLayoutEffect, useState } from 'react';
import ChoseButton from "../../components/choseButton/ChoseButton";

export default function ChosePanel(props){
    const content = props.content.map((el, key) => {
        if(props.type === "radio"){
            return <ChoseButton key={key} type="radio" handleClick={props.handleSelect} current={props.selected}>{el}</ChoseButton>
        }
        else if(props.type === "checkbox"){
            return <ChoseButton key={key} type="radio" handleClick={props.handleSelect} current={props.selected}>{el}</ChoseButton>
        }
        if(props.type === "group"){
            return <ChoseButton key={key} type="radio" handleClick={props.handleSelect} current={props.selected}>{el}</ChoseButton>
        }
    });

    useLayoutEffect(() => {
        const p = document.getElementById("panel-content");
        if (p) {
            if (props.top !== undefined) p.style.top = props.top + "px";
            if (props.left !== undefined) p.style.left = props.left + "px";
            if (props.right !== undefined) p.style.right = props.right + "px";
            if (props.bottom !== undefined) p.style.bottom = props.bottom + "px";
            if (props.height !== undefined){
                p.style.maxHeight = props.height + "px";
                p.style.minHeight = props.height + "px";
            }
            if (props.width !== undefined){
                p.style.maxWidth = props.width + "px";
                p.style.minWidth = props.width + "px";
            }
        }
    }, []);

    return (
        <div ref={props.ref} className="panel">
            <div className="overlay" onClick={props.close}></div>
            <div id="panel-content">
                {content}
            </div>
        </div>
    );
}