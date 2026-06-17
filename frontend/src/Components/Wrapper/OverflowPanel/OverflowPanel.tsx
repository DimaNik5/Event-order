import styles from "./OverflowPanelStyles.module.scss"

import { Props } from './types';

/*
    ref: RefObject<HTMLDivElement>;
    close(): void;
    children: React.ReactNode;
*/
export function OverflowPanel(props: Props){

    return (
        <div ref={props.ref} className={styles.panel}>
            <div className={styles.overlay} onClick={props.close}></div>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    );
}