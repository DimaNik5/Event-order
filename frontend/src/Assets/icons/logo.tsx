import type {IconProps} from "./type.js"

export const LogoIcon = ({ width = 24, height = 24, color = "black" }: IconProps) => (
    <svg width={width} height={height} viewBox="0 0 9.58 13.92">
        <polygon fill={color} points="-0,6.19 3.2,4 3.16,5.57 1.08,7.01 1.1,12.75 4.22,12.75 4.22,7.71 2.59,7.71 2.59,6.44 4.22,6.45 4.22,0 9.58,3.75 9.58,13.92 6.44,13.92 6.44,12.75 8.34,12.75 8.34,4.41 5.33,2.33 5.35,6.45 7,6.44 7,7.71 5.34,7.71 5.33,13.92 -0,13.92 "/>
    </svg>
);