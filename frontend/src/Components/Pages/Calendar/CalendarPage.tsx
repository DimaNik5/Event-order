import GridCalendar from "@/Components/Dummies/GridCalendar";
import InfoLayout from "@/Components/Layouts/InfoLayout/InfoLayout";
import LargePanel from "@/Components/Wrapper/LargePanel";
import styles from './CalendarPageStyles.module.scss'
import useCalendarPage from "./useCalendarPage";
import { Props } from "./types";

export default function CalendarPage(props: Props){
    const [head, filter, selectDate, date, events] = useCalendarPage(props.getDate);

    return (
        <InfoLayout header={head}>
            <div className={styles.panel_dp}>
                {selectDate}
            </div>
            <div className={styles.panel}>
                {filter}
            </div>
            <LargePanel><GridCalendar date={date} events={events} handleClick={ (day: string) => props.getDate ? props.getDate(`${day}.${date.getMonth()}.${date.getFullYear()}`) : {}}/></LargePanel>
        </InfoLayout>
    );
}