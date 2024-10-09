import { FC } from "react";
import { SkeletonContainer, SkeletonElement } from "./styles";
import { MenuSkeletonProps } from "@/types/layouts/Menus/wpMenu";

export const MenuSkeleton: FC<MenuSkeletonProps> = ({
  elements,
  direction,
  width,
  height,
  gap,
}) =>
{
  const skeletonItems = Array.from({ length: elements }).map((_, index) => (
    <SkeletonElement key={index} width={width} height={height} />
  ));

  return (
    <SkeletonContainer direction={direction} gap={gap}>
      {skeletonItems}
    </SkeletonContainer>
  );
};
