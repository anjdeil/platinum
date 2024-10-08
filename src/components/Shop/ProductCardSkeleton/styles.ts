import styled from "@emotion/styled";
import { ProductImageWrapper } from "../ProductCard/styles";

const SkeletonWrapper = styled.div`
    width: 100%;
    height: 100%;    
    border-radius: 8px;
    background: ${({ theme }) => theme.background.skeleton};
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;

    @keyframes shimmer {
        0% {
            background-position: 100% 0;
        }
        100% {
            background-position: -100% 0;
        }
    }
`;

export const SkeletonImage = styled(ProductImageWrapper)`
    border-radius: 8px;
    background: ${({ theme }) => theme.background.skeleton};
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
`;

export const SkeletonText = styled(SkeletonWrapper)`
    width: 60%;
    height: 20px;
`;

export const SkeletonButton = styled(SkeletonWrapper)`
    width: 100%;
    height: 40px;
`;

export const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 16px;
    row-gap: 8px;
`;