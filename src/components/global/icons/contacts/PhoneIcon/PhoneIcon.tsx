import { ContactIconProps } from "@/types/components/global/icons/Contacts";
import React from "react";


const PhoneIcon: React.FC<ContactIconProps> = ({
  width = "40",
  height = "40",
  fill = "#113760",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.6667 3.3335H13.3333C12.4493 3.3335 11.6014 3.68469 10.9763 4.30981C10.3512 4.93493 10 5.78277 10 6.66683V33.3335C10 34.2176 10.3512 35.0654 10.9763 35.6905C11.6014 36.3156 12.4493 36.6668 13.3333 36.6668H26.6667C27.5507 36.6668 28.3986 36.3156 29.0237 35.6905C29.6488 35.0654 30 34.2176 30 33.3335V6.66683C30 5.78277 29.6488 4.93493 29.0237 4.30981C28.3986 3.68469 27.5507 3.3335 26.6667 3.3335ZM21.6667 35.0002H18.3333V33.3335H21.6667V35.0002ZM26.6667 31.6668H13.3333V8.3335H26.6667V31.6668Z"
        fill={fill}
      />
    </svg>
  );
};

export default PhoneIcon;
