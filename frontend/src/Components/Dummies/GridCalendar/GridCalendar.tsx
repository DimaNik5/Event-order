import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './GridCalendarStyles.module.scss'
import { Props } from './types';
import DayComponent from './DayComponent';
import { Event } from '@/Models/Common/Event';

export default function GridCalendar(props: Props){
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const [event, setEvent] = useState<Event[]>([]);
    const gridRef = useRef<HTMLDivElement>(null);

    function calcCountDay(){
        return new Date(props.date.getFullYear(), props.date.getMonth(), 0).getDate();
    }

    function calcCountHollow(){
        return 42 - calcCountDay();
    }

    function calculateGridAreas() {
        const rows = 7;
        const columns = 7;
        const areas = [];
    
        let numDay = 1;
        let numHollow = 0;
        // Получаем день недели первого числа месяца (0 - воскресенье, 1 - понедельник и т.д.)
        let startDay = new Date(props.date.getFullYear(), props.date.getMonth() - 1, 1).getDay();
        // Корректировка для понедельника как первого дня
        startDay = startDay === 0 ? 6 : startDay - 1;
        
        const countDay = calcCountDay(); // количество дней в месяце
        
        for (let i = 0; i < rows; i++) {
            const row = [];
            
            for (let j = 0; j < columns; j++) {
                // Первая строка - названия дней
                if (i === 0) {
                    row.push(days[j]);
                    continue;
                }
                
                // Заполняем пустые ячейки до первого числа
                if (i === 1 && j < startDay) {
                    row.push(`hollow-${numHollow}`);
                    numHollow++;
                }
                // Заполняем дни месяца
                else if (numDay <= countDay) {
                    row.push(`day-${numDay}`);
                    numDay++;
                }
                // Заполняем оставшиеся ячейки пустыми
                else {
                    row.push(`hollow-${numHollow}`);
                    numHollow++;
                }
            }
            
            areas.push(`"${row.join(' ')}"`);
        }
        
        return areas.join(' ');
    }

    useLayoutEffect(() => {
        // Вычисляем значение
        const areasValue = calculateGridAreas();
        
        // Устанавливаем CSS переменную
        if (gridRef.current) {
          gridRef.current.style.setProperty('--grid-areas', `${areasValue}`);
        }
    }, [props.date]);

    useEffect(() => {
        if(props.events){
            setEvent(props.events.filter(e => Number(new Date(e.date).getMonth()) + 1 === Number(props.date.getMonth())));
        }
    }, [props.events, props.date]);

    return (
        <div className={styles.container}>
            <div ref={gridRef} className={styles.grid_container}>
                {Array.from({ length: calcCountHollow() }).map((_, index) => {
                    return <button style={{ gridArea: `hollow-${index}`}} className={styles.hollow_button}></button>
                })}
                {days.map((val, key) => {
                    return <div style={{ gridArea: val }} key={key}>{val}</div>
                })}
                {Array.from({ length: calcCountDay() }).map((_, index) => {
                    let cont: Record<string, number> = {};
                    event.forEach(e => {
                        const d = new Date(e.date);
                        if(d.getFullYear() === props.date.getFullYear() &&
                            d.getMonth() + 1 === props.date.getMonth() &&
                            d.getDate() === index + 1) {
                                cont[e.name] = Number(e.isPart) + Number(e.isYour);
                        }
                    })
                    return <DayComponent day={index + 1} content={cont} handleClick={(d: string) => props.handleClick ? props.handleClick(d) : {}}/>
                })}
            </div>
        </div>
    );
}