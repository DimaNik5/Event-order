
import InfoLayput from "@/Components/Layouts/InfoLayout";
import styles from './CreateEventPageStyles.module.scss'
import DecorateButton from "@/Components/UI/DecorateButton";
import CalendarPage from "../Calendar/CalendarPage";
import useCreateEventPage from "./useCreateEventPage";
import ResizablePanel from "@/Components/Wrapper/ResizablePanel";


export default function CreateEventPage(){
    const [head, getDate, inputContent, setNewDate, createBtn] = useCreateEventPage()

    return(
        <div className={styles.container}>
            {getDate && 
                <CalendarPage getDate={setNewDate}/>
            }
            {!getDate &&
                <InfoLayput header={head}>
                    <div className={styles.contant}>
                        <ResizablePanel>
                            {inputContent}
                            {createBtn}
                        </ResizablePanel>
                    </div>
                </InfoLayput>
            }
        </div>
        
        
    );
}