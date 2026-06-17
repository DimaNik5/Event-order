import { useEffect, useState } from "react";
import { Props } from "./types";

export default function usePanelWithBookMarks(props: Props){

    const [markbooks, setMarkbooks] = useState<string[]>([]);
    const [content, setContent] = useState<string[]>([]);
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        let m: string[] = [];
        let c: string[] = [];

        props.pages.forEach(p => {
            m.push(p.name);
            c.push(p.content);
        });

        setMarkbooks(m);
        setContent(c);

    }, [props.pages]);

    return [markbooks, content[current], current, setCurrent] as const;
}