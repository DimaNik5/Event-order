import styles from './CommentStyles.module.scss'
import { Props } from './types';

export default function Comment(props: Props){
    return(
        <button className={`${props.isMine ? `${styles.mine}` : ""} ${styles.container}`} onClick={() => props.onClick(props.id_com)}>
            {!props.isMine &&
                <div className={styles.name}>{props.name}</div>
            }
            <div className={`${props.isMine ? `${styles.content_mine}` : `${styles.content}`}`}>{props.content}</div>
            <div className={styles.time}>{props.isChanged ? "изменно": ""} {props.time}</div>
        </button>
    );
}