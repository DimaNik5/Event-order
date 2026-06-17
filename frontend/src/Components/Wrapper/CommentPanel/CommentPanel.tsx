
import styles from './CommentPanelStyles.module.scss'
import CommentBlock from '../CommentBlock';
import { Comment } from '../CommentBlock/types';
import DecoratedInput from '@/Components/Dummies/DecoratedInput';
import { useState } from 'react';
import { TGIcon } from '@/Assets/icons';


export default function CommentPanel(){
    const [comment, setComment] = useState('');

    const comms: Comment[][] = [[
        {
            id: 1,
            author: "name",
            content: "12332423454353453",
            time: "12:12",
            isChanged: false
        }
    ]]

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {
                    comms.map((coms, key) => {
                        return <CommentBlock isMine={true} comments={coms}/>
                    })
                }
            </div>
            <div className={styles.input}>
                <DecoratedInput name='Комментарий' isLeftText={true} callback={(name: string, content: string) => setComment(content)}/>
                <button className={styles.btn}><TGIcon height="100%" width="100%" color='white'/></button>
                
            </div>
        </div>

    );
}