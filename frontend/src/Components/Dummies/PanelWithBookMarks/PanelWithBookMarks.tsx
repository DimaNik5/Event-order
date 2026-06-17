import BackgroundPanel from '@/Components/Wrapper/BackgroundPanel';
import MarkBook from '../MarkBook';
import styles from './PanelWithBookMarksStyles.module.scss'
import { Props } from './types';
import usePanelWithBookMarks from './usePanelWithBookMarks';
import MDArea from '@/Components/Widgets/MDArea';

export default function PanelWithBookMarks(props: Props){
    const [markbooks, content, current, setCurrent] = usePanelWithBookMarks(props)

    return(
        <div className={styles.container}>
            <div className={styles.markbooks}>
                <div>
                    {markbooks.map((markbook, key) => {
                        return <MarkBook setCurrent={setCurrent} current={current} name={markbook} index={key}/>
                    })}
                </div>
            </div>
            <BackgroundPanel>
                <div className={styles.content}>
                    <MDArea content={content}/>
                </div>
            </BackgroundPanel>
        </div>
    );
}