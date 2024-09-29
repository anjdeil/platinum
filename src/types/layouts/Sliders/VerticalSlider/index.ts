
import { z } from "zod";
import { MenuSkeletonPropsSchema } from "../../menus";

/* const NavButtonSchema = z.object({
    onClick: z.function(),
    className: z.string(),
    children: z.any(),
}); */
  
export const SliderWrapperPropsSchema  = z.object({
    width: z.string().optional(),

});

export const SlidePropsSchema = z.object({
    wrap: z.enum(['wrap', 'nowrap']).optional(),
});


export const VerticalWpMenuPropsSchema = z.object({
    skeleton: MenuSkeletonPropsSchema.optional(),
    menuId: z.number(),
    className: z.string().optional(),
    ...SlidePropsSchema.shape,
    ...SliderWrapperPropsSchema.shape,
  
    
});

export type VerticalWpMenuProps = z.infer<typeof VerticalWpMenuPropsSchema>;
export type SliderWrapperProps = z.infer<typeof SliderWrapperPropsSchema>;
export type SlideProps = z.infer<typeof SlidePropsSchema>;
