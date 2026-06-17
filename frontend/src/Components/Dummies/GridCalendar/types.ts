import { Event } from "@/Components/Pages/Calendar/types";

export interface Props{
    date: Date;
    events: Event[];
    handleClick?(day: string): void;
}