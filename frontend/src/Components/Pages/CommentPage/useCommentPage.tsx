import { useState } from "react";
import useNavigation from "@/Hooks/useNavigation";
import { Header } from "@/Components/Dummies/Header";

export default function useCommentPage(){
    const {goBack, goTo} = useNavigation();

    const mainlist: string[] = ["Описание", "стр", "чтото"]

    const [list, setList] = useState(mainlist);
    
    const head = <Header licon="arrow" lhandleClick={goBack}>Комментарии</Header>

    return [head, list] as const;

}