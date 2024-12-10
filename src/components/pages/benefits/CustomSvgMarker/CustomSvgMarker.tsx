import { FC } from 'react';
import { z } from 'zod';

const SvgPropsSchema = z.object({
  color: z.string().optional(),
});

type SvgProps = z.infer<typeof SvgPropsSchema>;

export const CustomSvgMarker: FC<SvgProps> = ({ color = '#1E71BE' }) => {
  return (
    <svg
      width='14'
      height='10'
      viewBox='0 0 14 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{
        marginRight: '12px',
        flexShrink: '0',
        marginTop: '4px',
      }}
    >
      <path
        d='M5.39664 9.29126C5.006 9.68251 4.37199 9.68251 3.98135 9.29126L0.336298 5.6406C0.15052 5.45454 0.150626 5.15314 0.336533 4.96721C0.522661 4.78106 0.824494 4.78116 1.01049 4.96745L3.98134 7.94287C4.37199 8.33412 5.006 8.33412 5.39665 7.94287L12.99 0.337853C13.1762 0.151384 13.4784 0.15149 13.6644 0.338088C13.8499 0.524097 13.8498 0.825132 13.6642 1.01101L5.39664 9.29126Z'
        fill={color}
      />
    </svg>
  );
};
