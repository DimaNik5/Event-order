
import InfoLayout from "@/Components/Layouts/InfoLayout";
import styles from './CreateEventPageStyles.module.scss'
import DecorateButton from "@/Components/UI/DecorateButton";
import CalendarPage from "../Calendar/CalendarPage";
import useEditEventPage from "./useEditEventPage";
import ResizablePanel from "@/Components/Wrapper/ResizablePanel";
import useNavigation from "@/Hooks/useNavigation";


export default function EditEventPage(){
    const {goTo} = useNavigation();
    const [head, getDate, inputContent, setNewDate, save] = useEditEventPage()

    return(
        <div className={styles.container}>
            {getDate && 
                <CalendarPage getDate={setNewDate}/>
            }
            {!getDate &&
                <InfoLayout header={head}>
                    <div className={styles.contant}>
                        <ResizablePanel>
                                {inputContent}
                            <DecorateButton onClick={() => goTo("pages")} clip="up">Страницы</DecorateButton>
                            <DecorateButton onClick={save}>Сохранить</DecorateButton>
                        </ResizablePanel>
                    </div>
                </InfoLayout>
            }
        </div>
        
        
    );
}