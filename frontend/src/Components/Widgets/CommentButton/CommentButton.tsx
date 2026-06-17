import { CommentIcon } from "@/Assets/icons";
import styles from './CommentButtonStyles.module.scss'

export default function CommentButton({ onClick }: { onClick: () => void }){

    return(
        <button className={styles.container} onClick={onClick}>
            <CommentIcon height="45%" width="45%" color="var(--accent-color)"/>
        </button>
    );
}