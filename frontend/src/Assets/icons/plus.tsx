import type {IconProps} from "./type.js"

export const PlusIcon = ({ width = 24, height = 24, color = "black" }: IconProps) => (
    <svg width={width} height={height} viewBox="0 0 5.63 5.63">
        <rect fill={color} y="2.28" width="5.63" height="1.08"/>
        <rect fill={color} transform="matrix(3.7518E-15 -0.14166 0.14166 3.7518E-15 2.27642 5.63372)" width="39.77" height="7.63"/>
    </svg>
);