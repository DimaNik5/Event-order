
export interface Comment{
    id: number,
    author: string,
    content: string,
    time: string,
    isChanged: boolean
}

export interface Props{
    comments: Comment[],
    isMine: boolean
}