import styled from "@emotion/styled";

interface InfoCardProps {
    marginBottom?: string;
    marginTop?: string;
}

export const InfoCard = styled.div<InfoCardProps>`
    margin-bottom: ${({ marginBottom }) => marginBottom ? marginBottom : "20px"};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.borderSecodrary};
    margin: 0 auto;
    padding: 32px;
`;
