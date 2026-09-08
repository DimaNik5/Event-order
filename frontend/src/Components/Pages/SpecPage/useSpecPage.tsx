
import { useEffect, useMemo, useState } from "react";
import useNavigation from "@/Hooks/useNavigation";
import { Header } from "@/Components/Dummies/Header";
import { IconElements } from "@/Assets/icons";
import DecoratedInput from "@/Components/Dummies/DecoratedInput";
import styles from './SpecPageStyles.module.scss'
import { useParams } from 'react-router-dom';
import { EmbeddedGroup } from "@/Components/Dummies/EmbeddedGroup";
import DecorateButton from "@/Components/UI/DecorateButton";
import { FilterType } from "@/Hooks/useGroupFilter";
import useData from "@/Hooks/useData";
import { Specialisation } from "@/Models/Common/Specialisation";
import { User } from "@/Models/Common/User";

const createSpecOfUser = (specialisations: Specialisation[], specOfUser: number[] | undefined): FilterType => {
    const filter: FilterType = {};
    
    // Создаем Set для быстрой проверки наличия id
    const specOfUserSet = new Set(specOfUser || []);
    
    specialisations.forEach(spec => {
        filter[spec.name] = {};
        
        // Проверяем, есть ли данная специализация у пользователя
        const hasSpecialisation = specOfUserSet.has(spec.id);
        
        spec.spec.forEach(simpleType => {
            filter[spec.name][simpleType.name] = hasSpecialisation;
        });
    });

    return filter;
};

const getFilteredSimpleTypeIds = (
    filter: FilterType,
    allSpecialisations: Specialisation[]
): number[] => {
    return allSpecialisations.flatMap(specialisation => {
        const filterGroup = filter[specialisation.name];
        if (!filterGroup) return [];
        
        return specialisation.spec
            .filter(simpleType => {
                const isSelected = filterGroup[simpleType.name];
                return isSelected;
            })
            .map(simpleType => simpleType.id);
    });
};

export default function useSpecPage(){
    const {goBack} = useNavigation();
    const {getData, setData} = useData();

    const specialisation = getData.spec().data as Specialisation[];

    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : undefined;

    const me = getData.me().data as User;
    const users = getData.users().data as User[];
    const user = useMemo(() => numericId === undefined ? me
            : users.find(u => u.id === numericId), [me, users]);
    
    const [spec, setSpec] = useState<FilterType>({});

    useEffect(() => {
        if(specialisation && user){
            setSpec(createSpecOfUser(specialisation, user.spec));
        }
    }, [specialisation, user]);


    const head = <Header licon="arrow" lhandleClick={goBack} isBotton={true}>{id !== undefined ? 'Специальности' : 'Мои специальности'}</Header>

    const updateSpec = (name: string, content: Record<string, boolean>) => {
        // if(id === undefined) alert('touch!');
        setSpec((prev: FilterType): FilterType => ({
            ...prev, 
            [name]: { 
                ...content 
            }
        }));
    }

    const save = () => {
        if(id !== undefined) return;
        setData.specMe.mutate(getFilteredSimpleTypeIds(spec, specialisation));
    }
    
    const cont = <EmbeddedGroup handleSelect={updateSpec} content={spec} unpresseble={id !== undefined}/>

    const savebtn = id !== undefined ? <div></div> : <DecorateButton onClick={save}>Сохранить</DecorateButton>

    return [head, cont, savebtn] as const;

}