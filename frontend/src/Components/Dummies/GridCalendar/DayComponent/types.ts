
export interface Props{
    day: number | string;
    content: Record<string, number>;
    handleClick(day: string): void;
}