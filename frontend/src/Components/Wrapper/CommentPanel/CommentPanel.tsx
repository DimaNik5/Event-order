
import styles from './CommentPanelStyles.module.scss'
import CommentBlock from '../CommentBlock';
import DecoratedInput from '@/Components/Dummies/DecoratedInput';
import { useMemo, useState } from 'react';
import { TGIcon } from '@/Assets/icons';
import useData from '@/Hooks/useData';
import { useParams } from 'react-router-dom';
import useNavigation from '@/Hooks/useNavigation';
import { Comment } from '@/Models/Common/Comment';
import { User } from '@/Models/Common/User';

function splitById(items: Comment[]): Comment[][] {
    if (items.length === 0) return [];
    
    const result: Comment[][] = [];
    let currentGroup: Comment[] = [];
    let currentValue: number = items[0].id;
    
    for (const item of items) {
        const value = item.id;
        
        // Если значение изменилось, начинаем новую группу
        if (value !== currentValue) {
            if (currentGroup.length > 0) {
                result.push(currentGroup);
            }
            currentGroup = [];
            currentValue = value;
        }
        
        currentGroup.push(item);
    }
    
    // Добавляем последнюю группу
    if (currentGroup.length > 0) {
        result.push(currentGroup);
    }
    
    return result;
}

export default function CommentPanel(){
    const {goBack} = useNavigation()
    const {getData, setData, setId} = useData();
    const users = getData.users().data as User[];
    const me = getData.me().data as User;
    
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : undefined;
    if(numericId === undefined) goBack();

    setId(numericId ?? -1);
    const comments = getData.comments().data as Comment[];

    const [comment, setComment] = useState('');

    const comms = useMemo(() => {
        comments.sort((a, b) => a.created_time.localeCompare(b.created_time));
        return splitById(comments); 
    }, [comments]);

    const sentComment = () => {
        if(comment){
            setData.sent.mutate({id_event: numericId, comment: comment});
            setComment('');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {
                    comms.map((coms, key) => {
                        return <CommentBlock author={users.find(u => u.id === coms[0].author)?.name}
                                isMine={coms[0].author === me.id} comments={coms}/>
                    })
                }
            </div>
            <div className={styles.input}>
                <DecoratedInput name='Комментарий' isLeftText={true} callback={(name: string, content: string) => setComment(content)}/>
                <button className={styles.btn} onClick={sentComment}><TGIcon height="100%" width="100%" color='white'/></button>
                
            </div>
        </div>

    );
}