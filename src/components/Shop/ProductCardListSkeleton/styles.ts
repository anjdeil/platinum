import { SkeletonWrapperProps } from "@/types/layouts/Skeleton";
import styled from "@emotion/styled";

export const SkeletonWrapper = styled.div<SkeletonWrapperProps>`
    display: grid;
    gap: 8px;
    grid-template-columns: ${({ column }) => `repeat(${column}, 1fr)`};
    justify-content: space-between;

    @media ${({ theme }) => theme.media.medium} {
        gap: 16px;
    }
`;

export const SkeletonItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
`;
