import Markdown from "react-markdown";
import styles from './MDAreaStyles.module.scss'
import { PropsEdit } from "./types";
import useMDEdit from "./useMDEdit";
import { IconElements } from "@/Assets/icons";


export default function MDEdit(props: PropsEdit){
    const [content, setContent, mode, setMode] = useMDEdit(props.init)

    return(
        <div className={styles.cont_edit}>
            <button className={styles.btn_mode} onClick={() => setMode(!mode)}>
                {!mode &&
                    IconElements['eye']
                }
                {mode &&
                    IconElements['edit']
                }
            </button>
            {!mode &&
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Введите Markdown..."
                    autoFocus
                />
            }
            {mode &&
                <div className={styles.cont}>
                    <Markdown>{content}</Markdown>
                </div>
            }
        </div>
    );
}