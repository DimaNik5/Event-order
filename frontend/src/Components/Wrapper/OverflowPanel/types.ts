import { RefObject } from "react";

export interface Props{
    ref: RefObject<HTMLDivElement>;
    close(): void;
    children: React.ReactNode;
}