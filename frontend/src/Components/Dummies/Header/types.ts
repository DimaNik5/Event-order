import type { IconName } from "@/Assets/icons";

export interface Props {
    licon?: IconName;
    lhandleClick?(): void;
    ricon?: IconName;
    rhandleClick?(): void;
    isBotton?: boolean;
    bicon?: IconName;
    btext?: string;
    bhandleClick?(): void;
    children?: React.ReactNode;
}