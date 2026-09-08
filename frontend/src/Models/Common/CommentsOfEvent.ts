import { Comment } from "./Comment";

export interface CommentsOfEvent{
    id_event: number,
    comments: Comment[]
}