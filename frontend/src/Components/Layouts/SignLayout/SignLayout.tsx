import { Props } from "./types";
import styles from './SignLayoutStyles.module.scss'
import { IconElements } from "@/Assets/icons";

export default function SignLayout(props: Props){

    return (
        <div className={styles.container}>
            <div className={styles.logotype}>
                {IconElements["logo"]}
            </div>
            {props.children}
        </div>
    );
}