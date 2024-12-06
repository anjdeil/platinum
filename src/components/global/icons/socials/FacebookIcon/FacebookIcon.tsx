import { ContactIconProps } from "@/types/components/global/icons/Contacts";
import React from "react";

const FacebookIcon: React.FC<ContactIconProps> = ({
  width = "24",
  height = "24",
  fill = "#113760",
}) => {
  return (
    <svg
      width={width}
      height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_296_20437)">
        <mask id="mask0_296_20437" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" style={{ maskType: "luminance" }}>

          <path d="M24 0H0V24H24V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_296_20437)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12.067C0 18.033 4.333 22.994 10 24V15.333H7.00001V12H10V9.33299C10 6.33299 11.933 4.667 14.667 4.667C15.533 4.667 16.467 4.8 17.333 4.933V7.99999H15.8C14.333 7.99999 14 8.73299 14 9.66698V12H17.2L16.667 15.333H14V24C19.667 22.994 24 18.034 24 12.067C24 5.43002 18.6 0 12 0C5.4 0 0 5.43002 0 12.067Z"
            fill={fill} />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_296_20437">
          <rect width={width}
            height={height} fill={fill} />
        </clipPath>
      </defs>
    </svg>

  );
};

export default FacebookIcon;
