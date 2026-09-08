
import useGroupFilter, { FilterType } from "@/Hooks/useGroupFilter";
import { Header } from '@/Components/Dummies/Header';
import {useMemo} from 'react'
import useListAddUserToEvent from "./useListAddUserToEvent";
import useNavigation from "@/Hooks/useNavigation";
import { Specialisation } from "@/Models/Common/Specialisation";
import useData from "@/Hooks/useData";
import { User } from "@/Models/Common/User";
import { UseQueryResult } from "@tanstack/react-query";


const createFilterFromSpecialisations = (specialisations: Specialisation[]): FilterType => {
    const filter: FilterType = {
        "Роли": {
            "Служитель": true,
            "Лидер": true,
            "Администратор": true,
            "СисАдминистратор": true
        },
    };
    
    specialisations.forEach(spec => {
        filter[spec.name] = {};
        spec.spec.forEach(simpleType => {
            filter[spec.name][simpleType.name] = true;
        });
    });
    
    return filter;
};

export default function useAddUserToEventList(){
    const {goBack} = useNavigation();
    const { getData } = useData();

    const {data, isLoading} = getData.spec() as UseQueryResult<Specialisation[], boolean>;
    
    const [list, createContent, updateList] = useListAddUserToEvent();
    
    const filter = useMemo(() => {
        if (!data) return {} as FilterType;
        return createFilterFromSpecialisations(data);
    }, [data]);
    
    const content = useMemo(() => ({
        filter: filter,
        storageName: "filter-users",
        updateList: updateList
    }), [filter, updateList]);
    
    const [fcontent, openFilter] = useGroupFilter(content);

    const head = <Header licon="arrow" lhandleClick={() => goBack()}
                         bicon="filter" bhandleClick={isLoading ? () => alert('wait') : openFilter} isBotton={true}>Добавить</Header>

    return [head, isLoading ? <div></div> : fcontent, list, createContent] as const;
}