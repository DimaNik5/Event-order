import useListEvent from "./useListEvent";
import {Header} from "@/Components/Dummies/Header";
import useNavigation from "@/Hooks/useNavigation";
import useRadioFilter from "@/Hooks/useRadioFilter";
import {useMemo} from 'react'

export default function useEventPage(){
    const {goTo} = useNavigation();

    const [list, createContent, updateList, clikOnElement] = useListEvent()
    
    const varFilter = ["Все", "Участие", "Мои"];
    const content = useMemo(() => ({filter:varFilter, initFilter:"Все", storageName:"filter-event", updateList:updateList}), []);
    const [filter, openFilter] = useRadioFilter(content);

    const head = <Header licon="calendar" lhandleClick={() => goTo('calendar')}
                    ricon="bell" rhandleClick={alert}
                    bicon="filter" bhandleClick={openFilter}
                    isBotton={true}>
                    События
                 </Header>

    return [head, filter, list, createContent, clikOnElement] as const;
}