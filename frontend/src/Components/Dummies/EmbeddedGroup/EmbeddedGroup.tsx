import { Props } from "./types";

import styles from "./EmbeddedGroupStyles.module.scss"
import {GroupButton} from "../GroupButton";
import type {GroupButtonListType as gblt} from "../GroupButton";

/*
    handleSelect(name: String, content: any): void;
    content: ListType<gblt>;
*/
export function EmbeddedGroup(props: Props<gblt>){

    return(
        <div className={styles.content}>
            {Object.keys(props.content).map(key =>{
                return <GroupButton key={key} content={props.content[key]} handleSetList={(setList: (prev: gblt) => gblt) => props.handleSelect(key, setList)}>{key}</GroupButton>
            })}
        </div>
    );
}