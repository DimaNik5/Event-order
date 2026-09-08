
export interface Props{
    id_com: number,
    onClick(id: number): void,
    name?: string,
    content: string,
    time: string,
    isChanged?: string,
    isMine: boolean
}