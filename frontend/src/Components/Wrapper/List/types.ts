interface DivElementProps {
    children: React.ReactNode;
    [key: string]: any;
}

export default interface Props<T>{
    list?: T[];
    content(el: T): React.ReactElement<DivElementProps> & { type: 'div' };
    onClick?(el: T): void;
}