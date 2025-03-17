// MenuSkeleton.tsx
import { MenuSkeletonProps } from '@/types/menus/Skeletons';
import { FC } from 'react';
import { SkeletonContainer, SkeletonElement } from './styles';

export const MenuSkeleton: FC<MenuSkeletonProps> = ({
  elements,
  direction,
  width,
  height,
  gap,
  color,
  light,
  dark,
  leftSide,
}) => {
  const skeletonItems = Array.from({ length: elements }).map((_, index) => (
    <SkeletonElement
      key={index}
      width={width}
      height={height}
      color={color}
      light={light}
      dark={dark}
    />
  ));

  return (
    <SkeletonContainer direction={direction} gap={gap} leftSide={leftSide}>
      {skeletonItems}
    </SkeletonContainer>
  );
};
