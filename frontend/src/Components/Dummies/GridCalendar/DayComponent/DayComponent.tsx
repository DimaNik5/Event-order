import { data } from 'react-router-dom';
import styles from './DayComponentStyles.module.scss'
import { Props } from './types';
import { useLayoutEffect, useRef, useState } from 'react';

export default function DayComponent(props: Props){
    const [maxVisible, setMaxVisible] = useState(1);
    const container = useRef<HTMLButtonElement>(null);
    const maxPart = Math.max(...Object.values(props.content).map(Number));

    useLayoutEffect(() => {
        if (!container.current) return;
        
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const h = entry.contentRect.height;
                // Исправленная формула расчета
                const itemHeight = 15; // 13px высота + 2px отступы
                const count = Math.floor((h - 20) / itemHeight);// вычитаем высоту дня и отступы
                setMaxVisible(Math.max(1, count));
            }
        });
        
        resizeObserver.observe(container.current);
        
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <button ref={container} key={props.day} style={{ gridArea: `day-${props.day}` }} className={styles.container} onClick={() => props.handleClick(props.day as string)}>
            {props.day}
            {Object.keys(props.content).map((key, index) => {
                const con = props.content[key];
                // Показываем элементы только если индекс меньше maxVisible - 1
                if (index < maxVisible - 1) {
                    return (
                        <div key={key} className={`${styles.btn} ${con < 2 ? (con === 1 ? styles.part : styles.none) : styles.main}`}>
                            {key}
                        </div>
                    );
                }
                return null;
            })}
            {Object.keys(props.content).length > maxVisible - 1 && (
                <div className={`${styles.btn} ${styles.more} ${maxPart < 2 ? (maxPart === 1 ? styles.part : styles.none) : styles.main}`}>
                    +{Object.keys(props.content).length - (maxVisible - 1)}
                </div>
            )}
        </button>
    );
}