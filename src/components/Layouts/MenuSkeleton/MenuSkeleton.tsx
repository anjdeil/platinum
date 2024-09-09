import { MenuSkeletonProps } from "@/types/layouts/Menus";
import { Box, Skeleton } from "@mui/material";
import { FC } from "react";

export const MenuSkeleton: FC<MenuSkeletonProps> = ({ elements, isColumn, width, height, gap }) =>
{
    const skeletonItems = Array.from({ length: elements || 0 }).map((_, index) => (
        <Skeleton
            key={index}
            animation="wave"
            sx={{
                width: width,
                height: height,
            }} />
    ));

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: isColumn ? 'column' : 'row',
            gap: gap
        }}>
            {skeletonItems}
        </Box>
    )
}