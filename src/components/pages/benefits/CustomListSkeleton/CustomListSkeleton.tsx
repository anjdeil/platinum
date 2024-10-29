import { MenuSkeletonProps } from "@/types/layouts/menus/Skeletons";
import { FC } from "react";
import { SkeletonWrapper } from './styles'
import { Skeleton } from "@mui/material";

export const CustomListSkeleton: FC<MenuSkeletonProps> = ({
    elements,
    width,
    height,
    gap,
}) => {
    const skeletonItems = Array.from({ length: elements }).map((_, index) => (
        <Skeleton key={index} width={width} height={height} />
    ));

    return (
        <SkeletonWrapper>
            {skeletonItems}
        </SkeletonWrapper>
    );
};