import type {IconProps} from "./type.js"

export const PointsIcon = ({ width = 24, height = 24, color = "black" }: IconProps) => (
    <svg width={width} height={height} viewBox="0 0 5.63 15">
        <circle fill={color} cx="2.815" cy="2.5" r="1.7"/>
        <circle fill={color} cx="2.815" cy="7.5" r="1.7"/>
        <circle fill={color} cx="2.815" cy="12.5" r="1.7"/>
    </svg>
);