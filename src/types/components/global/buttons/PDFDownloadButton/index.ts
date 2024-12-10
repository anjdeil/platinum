import { OrderTypeSchema } from '@/types/services';
import { z } from 'zod';

const PDFDownloadButtonPropsSchema = z.object({
    item: OrderTypeSchema,
});

export type PDFDownloadButtonProps = z.infer<typeof PDFDownloadButtonPropsSchema>;