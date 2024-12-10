import { ContactIconProps } from "@/types/components/global/icons/Contacts";
import React from "react";

const MailIcon: React.FC<ContactIconProps> = ({
  width = "40",
  height = "40",
  fill = "#113760",
}) => {
  return (
    <svg width={width}
      height={height}
      viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_406_5519)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.344 22.668L20.004 26.538L25.46 22.774L37.69 34.84C37.3673 34.9453 37.026 34.9987 36.666 35H3.334C2.894 35 2.474 34.914 2.088 34.76L14.344 22.668ZM40 12.752V31.666C40 32.16 39.892 32.628 39.7 33.05L27.712 21.222L40 12.752ZM0 12.858L12.084 21.122L0.212 32.838C0.0729255 32.4629 0.00115798 32.0661 0 31.666L0 12.858ZM36.666 5C38.506 5 40 6.492 40 8.334V9.506L19.996 23.296L0 9.62V8.334C0 6.494 1.492 5 3.334 5H36.666Z"
          fill={fill} />
      </g>
      <defs>
        <clipPath id="clip0_406_5519">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>

  );
};

export default MailIcon;
