import { Props } from "./types";
import styles from './DecoratedTextStyles.module.scss'

export default function DecoratedText(props: Props){

    return(
        <div className={styles.container}>
            <div className={styles.icon}>
                {props.icon &&
                    props.icon
                }
            </div>
            <div 
                className={`${props.isLeftText ? `${styles.lt}` : ""} ${styles.input}`}
            >{props.content}</div>
        </div>
    );
}