import { SkeletonButton, SkeletonContainer, SkeletonImage, SkeletonText } from "./styles";

export const ProductCardSkeleton: React.FC = () => {
    return (
        <SkeletonContainer>
            <SkeletonImage />
            <SkeletonText />
            <SkeletonText />
            <SkeletonButton />
        </SkeletonContainer>
    );
};
