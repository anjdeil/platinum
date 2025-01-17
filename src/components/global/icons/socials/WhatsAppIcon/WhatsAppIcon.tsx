import { ContactIconProps } from '@/types/components/global/icons/Contacts';
import React from 'react';

const WhatsAppIcon: React.FC<ContactIconProps> = ({
  width = '25',
  height = '24',
  fill = '#113760',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.600313 11.8527C0.599656 13.9417 1.14969 15.981 2.19537 17.7786L0.5 23.9207L6.83478 22.2726C8.58022 23.2168 10.5454 23.7147 12.5451 23.7154H12.5502C19.136 23.7154 24.4972 18.3975 24.5 11.8621C24.5011 8.69488 23.2591 5.71656 21.0031 3.47609C18.7468 1.23591 15.7468 0.00130233 12.5502 0C5.96337 0 0.602938 5.31721 0.600313 11.8527ZM4.37291 17.469L4.13637 17.0965C3.14206 15.5277 2.61725 13.7149 2.618 11.8534C2.62006 6.4213 7.07544 2.00186 12.554 2.00186C15.2071 2.00298 17.7005 3.02921 19.5759 4.89116C21.4512 6.7533 22.4831 9.22865 22.4824 11.8614C22.48 17.2935 18.0245 21.7135 12.5502 21.7135H12.5463C10.7638 21.7126 9.01569 21.2376 7.49113 20.34L7.12831 20.1265L3.36912 21.1045L4.37291 17.469Z"
        fill={fill}
      />
      <path
        d="M9.56358 6.89746C9.3399 6.40416 9.10449 6.39421 8.89177 6.38556C8.71758 6.37811 8.51846 6.37867 8.31952 6.37867C8.1204 6.37867 7.79686 6.453 7.5234 6.74928C7.24965 7.04583 6.47827 7.76249 6.47827 9.22007C6.47827 10.6776 7.54824 12.0864 7.6974 12.2843C7.84674 12.4817 9.76299 15.5686 12.7979 16.7562C15.3201 17.743 15.8334 17.5468 16.3808 17.4973C16.9283 17.448 18.1474 16.7808 18.3961 16.089C18.6451 15.3973 18.6451 14.8043 18.5704 14.6804C18.4958 14.557 18.2967 14.4829 17.9981 14.3348C17.6995 14.1867 16.2315 13.4698 15.9578 13.371C15.6841 13.2722 15.485 13.2229 15.2859 13.5195C15.0868 13.8157 14.515 14.4829 14.3407 14.6804C14.1666 14.8785 13.9923 14.9031 13.6938 14.755C13.3951 14.6063 12.4335 14.2938 11.2926 13.2846C10.405 12.4993 9.80574 11.5296 9.63155 11.2329C9.45736 10.9367 9.6129 10.7762 9.76261 10.6285C9.89677 10.4958 10.0613 10.2826 10.2107 10.1096C10.3596 9.93663 10.4093 9.81318 10.5089 9.6156C10.6085 9.41783 10.5586 9.24481 10.4841 9.09663C10.4093 8.94844 9.82908 7.48323 9.56358 6.89746Z"
        fill={fill}
      />
    </svg>
  );
};

export default WhatsAppIcon;
