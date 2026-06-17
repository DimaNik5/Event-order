
import InfoLayout from "@/Components/Layouts/InfoLayout/InfoLayout";
import styles from './EventContentPageStyles.module.scss'
import useEventContentPage from "./useEventContentPage";
import PanelWithBookMarks from "@/Components/Dummies/PanelWithBookMarks";


export default function EventContentPage(){
    const [head, pages, comment] = useEventContentPage();

    return(
        <InfoLayout header={head}>
            <PanelWithBookMarks pages={pages}/>
            <div className={styles.space}></div>
            {comment}
        </InfoLayout>
    );
}