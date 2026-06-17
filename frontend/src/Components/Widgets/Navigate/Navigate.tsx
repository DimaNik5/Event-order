import useNavigation from '@/Hooks/useNavigation';
import styles from './NavigateStyles.module.scss'
import {UserIcon} from "@/Assets/icons/user"


export default function Navigate(){
    const {goTo} = useNavigation();
    return (
        <div className={styles.container}>
            <button className={styles.left}  onClick={() => goTo("/users")}>
                <div>Все<br></br>участники</div>
            </button>
            <button className={styles.centre} onClick={() => goTo("/event")}>
                <div>События</div>
            </button>
            <button className={styles.right} onClick={() => goTo("/user")}>
                <UserIcon color='var(--info-color)'/>
            </button>
        </div>
    );
}