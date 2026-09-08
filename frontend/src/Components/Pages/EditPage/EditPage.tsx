
import InfoLayput from "@/Components/Layouts/InfoLayout";
import styles from './EditPageStyles.module.scss'
import ResizablePanel from "@/Components/Wrapper/ResizablePanel";
import useEditPage from "./useEditPage";
import MDEdit from "@/Components/Widgets/MDArea/MDEdit";
import BackgroundPanel from "@/Components/Wrapper/BackgroundPanel";


export default function EditPage(){
    const [head, inputContent, content, setContent] = useEditPage()

    return(
        <InfoLayput header={head}>
            <BackgroundPanel>
                {inputContent}
                <div className={styles.container}>
                    <MDEdit content={content} setContent={setContent}/>
                </div>
            </BackgroundPanel>
            <div className={styles.space}></div>
        </InfoLayput>
        
        
    );
}