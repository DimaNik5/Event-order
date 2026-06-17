import { Props } from "./types";
import styles from './DecoratedInputStyles.module.scss'
import { useDecoratedInput } from "./useDecoratedInput";
import { useEffect } from "react";

export default function DecoratedInput(props: Props){
    const [val, setVal, call, validate] = useDecoratedInput(props);

    useEffect(() => {
        if(props.content)
            setVal(props.content);
    }, [props.content]);

    return(
        <div className={styles.container}>
            <div className={styles.icon}>
                {props.icon &&
                    props.icon
                }
            </div>
            <input 
                onKeyDown={(e) => validate(e)}
                onChange={(e) => setVal(e.target.value)}
                onBlur={call}
                value={val}
                maxLength={props.maxLength ? props.maxLength : 10}
                name={props.name}
                placeholder={props.name}
                className={`${props.isLeftText ? `${styles.lt}` : ""} ${styles.input}`}
            />
        </div>
    );
}