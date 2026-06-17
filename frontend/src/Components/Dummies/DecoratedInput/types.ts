
export interface Props{
    callback: (name: string, content: string) => void;
    name: string;
    icon?: React.ReactElement;
    maxLength?: number;
    content?: string;
    isLeftText?: boolean;
}