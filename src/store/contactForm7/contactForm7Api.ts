import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { z } from 'zod';

const sendAnEmailArgsSchema = z.object({
  formId: z.string(),
  formData: z.object({
    _wpcf7_unit_tag: z.string(),
    email: z.string().email(),
  }),
});

const sendAnEmailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

type SendAnEmailResponse = z.infer<typeof sendAnEmailResponseSchema>;
type SendAnEmailArgs = z.infer<typeof sendAnEmailArgsSchema>;

export const contactForm7Api = createApi({
  reducerPath: 'contactForm7Api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/contact-form' }),
  endpoints: (build) => ({
    sendAnEmail: build.mutation<SendAnEmailResponse, SendAnEmailArgs>({
      query: ({ formId, formData }) => ({
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/${formId}/feedback`,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useSendAnEmailMutation } = contactForm7Api;
