import styles from './ResizablePanelStyles.module.scss'
import { Props } from './types';

export default function ResizablePanel(props: Props){
    return(
        <div className={`${styles.content} ${props.clip ? (props.clip === "up" ? styles.up : styles.bottom) : styles.bottom}`}>
            {props.children}
        </div>
    );
}