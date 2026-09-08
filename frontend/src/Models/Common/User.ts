import {type Roles} from "@/Constants/Types/RoleType"

export interface User{
    id: number,
    name: string,
    email: string,
    number: string,
    role_name: Roles,
    spec: number[]
}