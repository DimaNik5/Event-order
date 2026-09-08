import { Event } from "@/Models/Common/Event";


export interface Props{
    date: Date;
    events: Event[];
    handleClick?(day: string): void;
}