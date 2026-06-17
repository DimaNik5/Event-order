
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
    spec: Spec
}


export type Spec = Record<string, string[]>;