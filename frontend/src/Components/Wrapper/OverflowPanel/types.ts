import { RefObject } from "react";

export interface Props{
    ref: RefObject<HTMLDivElement | null>;
    close(): void;
    children: React.ReactNode;
}