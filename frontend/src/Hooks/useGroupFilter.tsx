import {useRef, useState} from 'react'
import useSessionStorage from './useSessionStorage';
import { OverflowPanel } from "@/Components/Wrapper/OverflowPanel";
import { EmbeddedGroup } from '@/Components/Dummies/EmbeddedGroup';

export type FilterType = Record<string, Record<string, boolean>>;

interface Params{
    filter: FilterType;
    storageName: string;
    updateList: (fil: FilterType) => void;
}

export default function useGroupFilter(params: Params){

    const filterRef = useRef<HTMLDivElement>(null);

    
    const [filter, setFilter] = useSessionStorage<FilterType>(params.storageName, params.filter, params.updateList);
    const prefFilter = useRef<FilterType>(filter);

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

    const updateFilter = (name: string, content: Record<string, boolean>) => {
        setFilter((prev: FilterType): FilterType => ({
            ...prev, 
            [name]: { 
                ...content 
            }
        }));
    }

    const fcontent = 
        <OverflowPanel ref={filterRef} close={closeFilter}>
            <EmbeddedGroup handleSelect={updateFilter} content={filter}/>
        </OverflowPanel>
    
    return [fcontent, openFilter] as const;

}