import styles from './HeaderStyles.module.scss'
import type {Props} from './types'
import { IconElements as icons } from '@/Assets/icons';


/*
    licon?: IconName;
    lhandleClick?(): void;
    ricon?: IconName;
    rhandleClick?(): void;
    isBotton?: boolean;
    bicon?: IconName;
    btext?: string;
    bhandleClick?(): void;
    children?: React.ReactNode;
*/
export default function Header(props: Props){
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.left}>
                    {(props.licon && icons[props.licon]) &&
                        <button onClick={props.lhandleClick} >
                            {icons[props.licon]}
                        </button>
                    }
                </div>
                <div className={styles.centre}>{props.children}</div>
                <div className={styles.right}>
                    {(props.ricon && icons[props.ricon]) &&
                        <button onClick={props.rhandleClick} >
                            {icons[props.ricon]}
                        </button>
                    }
                </div>
            </div>
            {props.isBotton &&
                <div className={styles.bottom}>
                    {(props.bicon && icons[props.bicon]) &&
                        <button className={styles.icon} onClick={props.bhandleClick} >
                            {icons[props.bicon]}
                        </button>
                    }
                    {(!props.bicon && props.btext) &&
                        <button className={styles.text} onClick={props.bhandleClick} >
                            {props.btext}
                        </button>
                    }
                </div>
            }
        </div>
    );
}