type Props = {
  size?: number;
  color?: string;
};

const CheckIcon = ({ size = 19, color = "#FBFBFB" }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="9.5" cy="9.5" r="8.75" stroke={color} strokeWidth="1.5" />
    <path
      d="M5.62964 9.14822L8.44445 11.963L13.3704 7.03711"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default CheckIcon;
