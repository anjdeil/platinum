import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ContactFormResponseType } from '@/types/services/contactForm7';

const baseUrl = process.env.NEXT_PUBLIC_WP_URL
  ? `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/contact-form-7/v1/contact-forms/`
  : '';

export const contactForm7Api = createApi({
  reducerPath: 'contactForm7Api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: build => ({
    sendAnEmail: build.mutation<ContactFormResponseType, any>({
      query: ({ formId, formData }) => ({
        url: `${formId}/feedback`,
        method: 'POST',
        body: formData,
      }),
    }),
    sendAmbassadorForm: build.mutation<ContactFormResponseType, any>({
      query: ({ formId, formData }) => ({
        url: `${formId}/feedback`,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useSendAnEmailMutation, useSendAmbassadorFormMutation } =
  contactForm7Api;
