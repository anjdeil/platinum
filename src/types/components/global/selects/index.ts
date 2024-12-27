import { z } from "zod";

export const SelectOptionsPropsSchema = z.object({
  name: z.string(),
  code: z.string(),
});

export const CustomSelectStyledPropsSchema = z.object({
  isOpen: z.boolean().optional(),
  width: z.string().optional(),
  borderRadius: z.string().optional(),
  color: z.string().optional(),
  background: z.string().optional(),
  padding: z.string().optional(),
  fontSize: z.string().optional(),
  mobFontSize: z.string().optional(),
  mobPadding: z.string().optional(),
  tabletPadding: z.string().optional(),
  alignItem: z.string().optional(),
  paddingOptions: z.string().optional(),
});

export const CustomSelectPropsSchema = z.object({
  options: z.array(SelectOptionsPropsSchema),
  value: z.string().optional(),
  onChange: z.function().args(z.any()).returns(z.void()),
  ...CustomSelectStyledPropsSchema.shape,
});
export const CustomFormSelectPropsSchema = z.object({
  options: z.array(SelectOptionsPropsSchema),
  value: z.string().optional(),
  onChange: z.function().args(z.any()).returns(z.void()).optional(),
  setValue: z
    .function()
    .args(
      z.any(),
      z.any(),
      z
        .object({
          shouldValidate: z.boolean().optional(),
          shouldDirty: z.boolean().optional(),
          shouldTouch: z.boolean().optional(),
        })
        .optional()
    )
    .returns(z.void())
    .optional(),
  name: z.string().optional(),
  label: z.string().optional(),
  register: z.any().optional(),
  errors: z.any().optional(),
  defaultValue: z.string().nullable().optional(),
  ...CustomSelectStyledPropsSchema.shape,
});

export const SortSelectPropsSchema = z.object({
  isOpen: z.boolean().optional(),
});

export const SortSelectStyledPropsSchema = SortSelectPropsSchema.extend({
  width: z.string().optional(),
  maxWidth: z.string().optional(),
  mobFontSize: z.string().optional(),
  fontSize: z.string().optional(),
});

export type CustomSelectStyledProps = z.infer<typeof CustomSelectStyledPropsSchema>;
export type CustomFormSelectProps = z.infer<typeof CustomFormSelectPropsSchema>;
export type SelectOptionsProps = z.infer<typeof SelectOptionsPropsSchema>;
export type CustomSelectProps = z.infer<typeof CustomSelectPropsSchema>;

export type SortSelectStyledProps = z.infer<typeof SortSelectStyledPropsSchema>;
export type SortSelectProps = z.infer<typeof SortSelectPropsSchema>;
