import styled from "@emotion/styled";

const SkeletonWrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    
    @keyframes shimmer {
        0% {
            background-position: -100% 0;
        }
        100% {
            background-position: 100% 0;
        }
    }
`;

const SkeletonImage = styled(SkeletonWrapper)`
    position: relative;
    width: 80px;
    height: 80px;
    @media ${({ theme }) => theme.media.medium} {
        width: 100px;
        height: 100px;
    }
    @media ${({ theme }) => theme.media.large} {
        width: 205px;
        height: 205px;
    }
`;

const SkeletonText = styled(SkeletonWrapper)`
    width: 60%;
    height: 20px;
    margin: 8px 0;
`;

const SkeletonButton = styled(SkeletonWrapper)`
    width: 100%;
    height: 40px;
    margin: 8px 0;
`;

const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 16px;
    row-gap: 8px;
`;

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
