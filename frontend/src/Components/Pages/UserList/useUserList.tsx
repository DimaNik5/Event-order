import useListUser from './useListUser';
import useGroupFilter, { FilterType } from "@/Hooks/useGroupFilter";
import { Header } from '@/Components/Dummies/Header';
import {useEffect, useMemo} from 'react'
import useData from '@/Hooks/useData';
import { UseQueryResult } from '@tanstack/react-query';
import { Specialisation } from '@/Models/Common/Specialisation';
import { User } from '@/Models/Common/User';
import { Roles } from '@/Constants/Types/RoleType';

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

export default function useUserList(){
    const { getData } = useData();

    const {data, isLoading} = getData.spec() as UseQueryResult<Specialisation[], boolean>;
    const me = getData.me().data as User;

    const addF = useMemo(() => {
        if (!me) return false;
        return me.role_name !== Roles.ADMIN && me.role_name !== Roles.SYSADMIN;
    }, [me]);
    
    const [list, createContent, updateList, editContent] = useListUser();

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

    const head = <Header bicon="filter" bhandleClick={isLoading ? () => alert('wait') : openFilter} isBotton={true}>Участники</Header>

    return [head, isLoading ? <div></div> : fcontent, editContent, list, createContent, addF] as const;
}