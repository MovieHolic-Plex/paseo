import Svg, { Circle, Path } from "react-native-svg";

interface OmoIconProps {
  size?: number;
  color?: string;
}

export function OmoIcon({ size = 16, color = "currentColor" }: OmoIconProps) {
  return (
    <Svg width={size} height={size} viewBox="4 4 56 56" fill={color}>
      <Path d="M18 14a14 14 0 1 0 0 28 14 14 0 0 0 0-28zm0 8a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
      <Path d="M46 14a14 14 0 1 0 0 28 14 14 0 0 0 0-28zm0 8a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
      <Circle cx="32" cy="50" r="4" />
    </Svg>
  );
}
