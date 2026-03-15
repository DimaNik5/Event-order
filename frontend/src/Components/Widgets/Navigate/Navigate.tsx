import styles from './NavigateStyles.module.scss'
import {UserIcon} from "@/Assets/icons/user"

import { useNavigate } from 'react-router-dom';

export default function Navigate(){
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <button className={styles.left}  onClick={() => navigate("/users")}>
                <div>Все<br></br>участники</div>
            </button>
            <button className={styles.centre} onClick={() => navigate("/event")}>
                <div>События</div>
            </button>
            <button className={styles.right} onClick={() => navigate("/user")}>
                <UserIcon color='var(--info-color)'/>
            </button>
        </div>
    );
}