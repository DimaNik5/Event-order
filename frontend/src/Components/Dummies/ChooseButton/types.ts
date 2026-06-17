export enum TypeButton{
    RADIO = 0,
    CHECKBOX = 1
}

export interface Props{
    type: TypeButton;
    current?: string;
    handleClick(name: string, flag: boolean): void;
    selected?: boolean;
    children: string;
    unpresseble?: boolean;
}