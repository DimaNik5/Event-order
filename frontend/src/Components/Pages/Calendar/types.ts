
export type Month = 'Январь' | 'Февраль' | 'Март' | 'Апрель' | 
                    'Май' | 'Июнь' | 'Июль' | 'Август' |
                    'Сентябрь' | 'Октябрь' | 'Ноябрь' | 'Декабрь'; 


export interface Props{
    getDate?: (date: string) => void;
}