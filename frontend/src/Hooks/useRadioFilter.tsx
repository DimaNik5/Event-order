import {useRef, useState} from 'react'
import useSessionStorage from './useSessionStorage';
import { OverflowPanel } from "@/Components/Wrapper/OverflowPanel";
import { RadioGroup } from "@/Components/Dummies/RadioGroup";

interface Params{
    filter: string[];
    initFilter: string;
    storageName: string;
    updateList: (fil: string) => void;
}

export default function useRadioFilter(params: Params){
    const filterRef = useRef<HTMLDivElement>(null);

    const [filter, setFilter] = useSessionStorage<string>(params.storageName, params.initFilter, params.updateList);
    const prefFilter = useRef(filter);

    const changeFilter = (name: string, flag: boolean) => {
        if(flag){
            setFilter(name);
        }
    }

    const checkUpdateList = () =>{
        if(prefFilter.current !== filter){
            prefFilter.current = filter;
            params.updateList(filter);
        }
    }

    const openFilter = () => {
        if(filterRef.current){
            filterRef.current.classList.add("show");
        }
    }
    
    const closeFilter = () => {
        if(filterRef.current){
            filterRef.current.classList.remove("show");
            checkUpdateList();
        }
    }

    const fcontent = <OverflowPanel ref={filterRef} close={closeFilter}>
                        <RadioGroup handleSelect={changeFilter} managerTrigger={filter} content={params.filter}/>
                    </OverflowPanel>;

    return [fcontent, openFilter] as const;
}