import theme from "@/styles/theme";

export default function CheckIcon({size = 12, color = theme.background.main} : {size?: number, color?: string}) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 6.5L4 9.5L11.5 2" stroke={color} strokeWidth="2"/>
    </svg>
  );
}