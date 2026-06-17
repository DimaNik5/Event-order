import { SelectButton } from '@/Components/UI/SelectButton';
import styles from './GroupButtonStyles.module.scss'



import type {Props} from './types'
import useGroupButton from './useGroupButton';
import {ArrowIcon} from '@/Assets/icons'

/*
    content: ListType;
    handleSetList: (newContent: ListType) => void;
    children: React.ReactNode;
*/
export function GroupButton(props: Props){
    const [content, lvlSet, isOpen, setIsOpen, click] = useGroupButton(props);

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <SelectButton selected={lvlSet} onClick={() => !props.unpresseble && click()}/>
                <div className={styles.name}>{props.children}</div>
                <button className={`${styles.btn} ${isOpen ? styles.btn_open : ''}`} onClick={() => setIsOpen(!isOpen)}>
                    <ArrowIcon width="100%" height="100%" color='#fff'/>
                </button>
            </div>
            {isOpen &&
                <div className={styles.content}>
                    {content}
                </div>
            }
        </div>  
    );
}