import styles from './ChooseButtonStyles.module.scss'

import type {Props} from "./types"
import useChooseButton from "./useChooseButton"
import {SelectButton, SelectedType} from "@/Components/UI/SelectButton"

/*
    type: TypeButton;
    current: string;
    handleClick(name: string, flag: boolean): void;
    selected: boolean;
    children: string;
*/
export function ChooseButton(props: Props){
    const [selected, state, click] = useChooseButton(props);

    return (
        <div className={styles.container}>
            
            <SelectButton onClick={() => !props.unpresseble && click()} selected={selected}/>
            <div className={styles.content}>{state.name}</div>
        </div>
    );
}