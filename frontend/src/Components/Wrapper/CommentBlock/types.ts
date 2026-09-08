import { Comment } from "@/Models/Common/Comment";

export interface Props{
    comments: Comment[],
    author?: string,
    isMine: boolean
}