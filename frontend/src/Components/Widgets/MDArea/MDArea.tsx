import Markdown from "react-markdown";
import styles from './MDAreaStyles.module.scss'
import { PropsArea } from "./types";


export default function MDArea(props: PropsArea){

    return(
        <div className={styles.container}>
            <Markdown>{props.content}</Markdown>
        </div>
    );
}