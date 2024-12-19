import { z } from "zod";

export const SideListContainerSchema = z.object({
  width: z.string().optional(),
  scroll: z.number().optional(),
});

export const ListSchema = z.object({
  marginTop: z.string().optional(),
  marginBottom: z.string().optional(),
  rowGap: z.string().optional(),
});

export const StyledListItemSchema = z.object({
  fontSize: z.string().optional(),
  lineHeight: z.string().optional(),
  tabletFontSize: z.string().optional(),
  mobFontSize: z.string().optional(),
  mobLineHeight: z.string().optional(),
  fontWeight: z.number().optional(),
  borderRadius: z.string().optional(),
  width: z.string().optional(),
  hoverBackground: z.string().optional(),
  hoverColor: z.string().optional(),
  isActive: z.boolean().optional(),
  tabletLineHeight: z.string().optional(),
  padding: z.string().optional(),
  btnpadding: z.string().optional(),
});

export const StyledItemPropsSchema = z.object({
  fontSize: z.string().optional(),
  lineHeight: z.string().optional(),
  fontWeight: z.number().optional(),
  borderRadius: z.string().optional(),
  width: z.string().optional(),
  hoverBackground: z.string().optional(),
  hoverColor: z.string().optional(),
});

export const SideListLinkSchema = z.object({
  name: z.string(),
  url: z.string(),
  isActive: z.boolean(),
  isNested: z.boolean().optional(),
  children: z.any().optional(),
});

export const SideListPropsSchema = z.object({
  ...ListSchema.shape,
  ...StyledListItemSchema.shape,
  links: z.array(SideListLinkSchema),
  activeLink: z.string().optional(),
  onClick: z.function().args(z.string(), z.string().optional()).returns(z.void()).optional(),
});

export type SideListLinkType = z.infer<typeof SideListLinkSchema>;
export type SideListPropsType = z.infer<typeof SideListPropsSchema>;
export type SideListContainerProps = z.infer<typeof SideListContainerSchema>;
export type ListProps = z.infer<typeof ListSchema>;
export type StyledListItemProps = z.infer<typeof StyledListItemSchema>;
export type StyledItemProps = z.infer<typeof StyledItemPropsSchema>;
