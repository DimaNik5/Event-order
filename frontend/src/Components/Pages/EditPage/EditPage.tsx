
import InfoLayput from "@/Components/Layouts/InfoLayout";
import styles from './EditPageStyles.module.scss'
import ResizablePanel from "@/Components/Wrapper/ResizablePanel";
import useEditPage from "./useEditPage";
import MDEdit from "@/Components/Widgets/MDArea/MDEdit";
import BackgroundPanel from "@/Components/Wrapper/BackgroundPanel";


export default function EditPage(){
    const [head, inputContent] = useEditPage()

    return(
        <InfoLayput header={head}>
            <BackgroundPanel>
                {inputContent}
                <div className={styles.container}>
                    <MDEdit init=""/>
                </div>
            </BackgroundPanel>
            <div className={styles.space}></div>
        </InfoLayput>
        
        
    );
}