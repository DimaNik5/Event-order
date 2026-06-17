import { SelectedType } from "@/Components/UI/SelectButton";

export enum Roles{
    NONE = '',
    MINISTER = 'Служитель',
    LEADER = 'Лидер',
    ADMIN = 'Администратор',
    SYSADMIN = 'СисАдминистратор'
}

export interface User{
    name: string,
    role: Roles,
    spec: Spec,
    add: SelectedType;
}


export type Spec = Record<string, string[]>;