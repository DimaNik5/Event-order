import useListUser from './useListUser';
import useGroupFilter, { FilterType } from "@/Hooks/useGroupFilter";
import { Header } from '@/Components/Dummies/Header';
import {useMemo} from 'react'



export default function useUserList(){
    const filter: FilterType = {
        "Роли": {
            "Служитель": true,
            "Лидер": true,
            "Администратор": true,
            "СисАдминистратор": true
        },
        "Музыканты": {
            "Поющие": true,
            "Играющие": true
        },
        "Group": {
            "el1": true,
            "el2": true
        },
        "Some": {
            "s1": true,
            "s2": true
        }
    }
    
    const [list, createContent, updateList, editContent] = useListUser();
    const content = useMemo(() => ({filter: filter, storageName:"filter-users", updateList: updateList}), [])
    const [fcontent, openFilter] = useGroupFilter(content)

    const head = <Header bicon="filter" bhandleClick={openFilter} isBotton={true}>Участники</Header>

    return [head, fcontent, editContent, list, createContent] as const;
}