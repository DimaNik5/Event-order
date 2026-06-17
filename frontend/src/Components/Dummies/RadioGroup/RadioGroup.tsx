import { ChooseButton } from "../ChooseButton";
import { TypeButton } from "../ChooseButton";
import { Props } from "./types";

import styles from "./RadioGroupStyles.module.scss"

/*
    handleSelect(name: string, content: boolean): void;
    managerTrigger?: string;
    content: string[];
*/
export function RadioGroup(props: Props){

    return(
        <div className={styles.content}>
            {props.content.map((value, key) =>{
                return <ChooseButton key={key} type={TypeButton.RADIO} handleClick={props.handleSelect} current={props.managerTrigger}>{value}</ChooseButton>
            })}
        </div>
    );
}