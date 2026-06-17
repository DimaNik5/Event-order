
export type Month = 'Январь' | 'Февраль' | 'Март' | 'Апрель' | 
                    'Май' | 'Июнь' | 'Июль' | 'Август' |
                    'Сентябрь' | 'Октябрь' | 'Ноябрь' | 'Декабрь'; 

export interface Event{
    name: string;
    date: Date;
    partition: number;
}

export interface Props{
    getDate?: (date: string) => void;
}