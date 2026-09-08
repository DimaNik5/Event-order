import useNavigation from "@/Hooks/useNavigation";
import { Header } from "@/Components/Dummies/Header";

export default function useCommentPage(){
    const {goBack} = useNavigation();
    
    const head = <Header licon="arrow" lhandleClick={goBack}>Комментарии</Header>

    return [head] as const;

}