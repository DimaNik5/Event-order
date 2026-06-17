
import useGroupFilter, { FilterType } from "@/Hooks/useGroupFilter";
import { Header } from '@/Components/Dummies/Header';
import {useMemo} from 'react'
import useListAddUserToEvent from "./useListAddUserToEvent";
import useNavigation from "@/Hooks/useNavigation";



export default function useAddUserToEventList(){
    const {goBack} = useNavigation();

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
    
    const [list, createContent, updateList] = useListAddUserToEvent();
    const content = useMemo(() => ({filter: filter, storageName:"filter-users", updateList: updateList}), [])
    const [fcontent, openFilter] = useGroupFilter(content)

    const head = <Header licon="arrow" lhandleClick={() => goBack()}
                         bicon="filter" bhandleClick={openFilter} isBotton={true}>Добавить</Header>

    return [head, fcontent, list, createContent] as const;
}