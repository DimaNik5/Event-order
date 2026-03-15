import styles from "./ListStyles.module.scss"
import Props from './types';

/*
    list: T[];
    content(el: T): React.ReactNode (div)
*/
export default function List<T>(props: Props<T>){

    return (
        
        <div className={styles.list}>
        {
            props.list.map((value: T, key) =>{
                return <div key={key} className={styles.element} >
                   {props.content(value).props.children}
                </div>
            })
        }
        </div>
    );
}