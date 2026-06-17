import { UserIcon } from '@/Assets/icons';
import styles from './CommentBlockStyles.module.scss'
import { Props } from './types';
import Comment from '@/Components/Dummies/Comment';

export default function CommentBlock(props: Props){
    let count = 0;

    return (
        <div className={styles.container}>
            {!props.isMine &&    
                <div className={styles.icon_con}>
                    <div className={styles.icon}>
                        <UserIcon height="100%" width="100%" color='white'/>
                    </div>
                </div>
            }
            <div className={styles.content}>
                {
                    props.comments.map((com, key) => {
                        count++;
                        return <Comment id_com={com.id} name={count === 1 ? com.author : undefined}
                                        content={com.content} time={com.time} isChanged={com.isChanged}
                                        isMine={props.isMine} onClick={(id: number) => alert(id)}/>
                    })
                }
            </div>
        </div>
    );
}