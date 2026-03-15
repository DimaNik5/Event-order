import type {IconProps} from "./type.js"

export const CheckmarkIcon = ({ width = 24, height = 24, color = "black" }: IconProps) => (
    <svg width={width} height={height} viewBox="0 0 4.83 4.92">
        <polygon fill={color} points="-0,2.09 1.92,4.92 4.83,0.75 4.35,0 1.95,3.61 0.45,1.42 "/>
    </svg>
);