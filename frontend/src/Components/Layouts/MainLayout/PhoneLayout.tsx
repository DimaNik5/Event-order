import { Navigate } from "@/Components/Widgets/Navigate"
import styles from "./MainLayoutStyles.module.scss"
import { Props } from "./types"

export default function PhoneLayout(props: Props){

    return (
        <div className={styles.container}>
            {props.header}
            {props.children}
            <Navigate />
        </div>
    )
}