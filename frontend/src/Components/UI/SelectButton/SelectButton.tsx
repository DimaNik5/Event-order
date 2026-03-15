import styles from './SelectedButtonStyles.module.scss'
import type {Props} from "./types"
import {SelectedType} from "./types"
import {RhombIcon, CheckmarkIcon} from "@/Assets/icons"

/*
    selected: SelectedType;
    onClick(): void;
*/
export default function SelectButton(props: Props){

    const content = props.selected == SelectedType.OFF ? <div></div> :
                    (props.selected === SelectedType.RADIO_ON ? <div className={styles.radio_set}></div> :
                    (<div className={styles.check_set}>
                        <CheckmarkIcon width="95%" height="95%" color='#fff'/>
                    </div>))

    return (
        <div className={styles.btn}>
            <button onClick={props.onClick}>
                <RhombIcon width="100%" height="100%" color='#fff'/>
            </button>
            {content}
        </div>
    );
}