import {
  ContactFormReqType,
  ContactFormResponseType,
} from '@/types/services/contactForm7';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactForm7Api = createApi({
  reducerPath: 'contactForm7Api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/contact-form' }),
  endpoints: (build) => ({
    sendAnEmail: build.mutation<ContactFormResponseType, ContactFormReqType>({
      query: ({ formId, formData }) => ({
        url: `/${formId}/feedback`,
        method: 'POST',
        body: formData,
      }),
    }),
    sendAmbassadorForm: build.mutation<ContactFormResponseType, any>({
      query: ({ formId, formData }) => ({
        url: `/${formId}/feedback`,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useSendAnEmailMutation, useSendAmbassadorFormMutation } =
  contactForm7Api;
