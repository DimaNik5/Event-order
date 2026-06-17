import styles from "./InfoLayoutStyles.module.scss"
import { Props } from "./types"

export default function InfoLayout(props: Props){

    return (
        <div className={styles.container}>
            {props.header}
            {props.children}
        </div>
    )
}