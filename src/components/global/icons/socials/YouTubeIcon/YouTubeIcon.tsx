import { ContactIconProps } from "@/types/components/global/icons/Contacts";
import React from "react";

const YouTubeIcon: React.FC<ContactIconProps> = ({
  width = "24",
  height = "24",
  fill = "#113760",
}) => {
  return (
    <svg
      width={width}
      height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.0038 11.7913L11.1963 10.4813C10.9513 10.3675 10.75 10.495 10.75 10.7662V13.2338C10.75 13.505 10.9513 13.6325 11.1963 13.5188L14.0025 12.2087C14.2488 12.0938 14.2488 11.9063 14.0038 11.7913ZM12 0C5.37252 0 1.90735e-05 5.3725 1.90735e-05 12C1.90735e-05 18.6275 5.37252 24 12 24C18.6275 24 24 18.6275 24 12C24 5.3725 18.6275 0 12 0ZM12 16.875C5.85752 16.875 5.75002 16.3213 5.75002 12C5.75002 7.67875 5.85752 7.125 12 7.125C18.1425 7.125 18.25 7.67875 18.25 12C18.25 16.3213 18.1425 16.875 12 16.875Z"
        fill={fill} />
    </svg>
  );
};

export default YouTubeIcon;
