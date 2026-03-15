import { Navigate } from "@/Components/Widgets/Navigate"
import styles from "./MainLayoutStyles.module.scss"

export default function PhoneLayout({children}: {children: React.ReactNode}){

    return (
        <div className={styles.container}>
            {children}
            <Navigate />
        </div>
    )
}