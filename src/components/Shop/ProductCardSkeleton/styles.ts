import styled from "@emotion/styled";

export const SkeletonWrapper = styled.div`
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

export const SkeletonImage = styled(SkeletonWrapper)`
    position: relative;
    width: 205px;
    height: 205px;
    
    @media ${({ theme }) => theme.media.large} {
        width: 100px;
        height: 100px;
    }
    @media ${({ theme }) => theme.media.medium} {
        width: 80px;
        height: 80px;
    }
`;

export const SkeletonText = styled(SkeletonWrapper)`
    width: 60%;
    height: 20px;
    margin: 8px 0;
`;

export const SkeletonButton = styled(SkeletonWrapper)`
    width: 100%;
    height: 40px;
    margin: 8px 0;
`;

export const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 16px;
    row-gap: 8px;
`;