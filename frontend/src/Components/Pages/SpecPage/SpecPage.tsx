
import InfoLayput from "@/Components/Layouts/InfoLayout";
import styles from './SpecPageStyles.module.scss'
import useSpecPage from "./useSpecPage";
import ResizablePanel from "@/Components/Wrapper/ResizablePanel";


export default function CreateEventPage(){
    const [head, content, savebtn] = useSpecPage()

    return(
        <div className={styles.container}>
            <InfoLayput header={head}>
                <div className={styles.conteiner}>
                    <ResizablePanel>
                        
                            <div className={styles.contant}>
                                {content}
                            </div>
                            {savebtn}
                    </ResizablePanel>
                </div>
            </InfoLayput>
            
        </div>
        
        
    );
}