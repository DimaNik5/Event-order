
import useNavigation from "@/Hooks/useNavigation";
import { EventContent } from "./types";
import { Header } from "@/Components/Dummies/Header";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import CommentButton from "@/Components/Widgets/CommentButton";

export default function useEventContentPage(){
    const {goBack, goTo} = useNavigation();
    
    const { id } = useParams<{ id: string }>();

    const maincont: EventContent = {
        name: `Event ${id}`,
        pages: [
            {
                name: "Описание",
                content: "**1123334343**54545\nwdddsdd\n\nff\tffggff\nxc"
            },
            {
                name: "Оп",
                content: "# 112333434354545\nwdddsdd\n\nff\tffggff\nxc"
            },
            {
                name: "Описание длиное",
                content: "112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n\nff\tffggff\nxc"
            },
            {
                name: "Описание длиное 1233456654634423423",
                content: "112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n\nff\tffggff\nxc"
            },
            {
                name: "Описаниедлиное",
                content: "112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n\nff\tffggff\nxc112333434354545\nwdddsdd\n\nff\tffggff\nxc"
            },
        ]
    }

    const [cont, setCont] = useState(maincont);
    
    const head = <Header licon="arrow" lhandleClick={goBack}
                         ricon="edit" rhandleClick={() => goTo('edit')}
                         bicon="user" bhandleClick={() => goTo('users')}
                         isBotton={true}>{cont.name}</Header>
    
    const comment = <CommentButton onClick={() => goTo('comment')}/>

    return [head, cont.pages, comment] as const;
}