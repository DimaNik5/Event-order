
export interface Props{
    handleSelect(name: string, content: boolean): void;
    managerTrigger?: string;
    content: string[];
}