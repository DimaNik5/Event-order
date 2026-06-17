
export interface Props{
    children: React.ReactNode;
    onClick?(): void
    clip?: "up" | "down";
}