import {useState} from 'react'


export default function useMDEdit(){
    const [mode, setMode] = useState(false)

    return [mode, setMode] as const;

}