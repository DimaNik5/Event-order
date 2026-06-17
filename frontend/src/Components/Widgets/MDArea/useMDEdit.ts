import {useState} from 'react'


export default function useMDEdit(init: string){
    const [content, setContent] = useState(init);
    const [mode, setMode] = useState(false)

    return [content, setContent, mode, setMode] as const;

}