import { Props } from "./types";
import styles from './MarkBookStyles.module.scss'

export default function MarkBook(props: Props){

    return(
        <button key={props.index} className={`${styles.container} ${props.current === props.index ? styles.selected : ''}`}
                onClick={() => props.setCurrent(props.index)}>
            {props.name}
        </button>
    );
}