import styles from './DecorateButtonStyle.module.scss'
import { Props } from './types';

export default function DecorateButton(props: Props){

    return(
        <button onClick={props.onClick}
            className={`${styles.btn} ${props.clip ? (props.clip === "up" ? styles.up : styles.bottom) : styles.bottom}`}>
            {props.children}
        </button>
    );
}