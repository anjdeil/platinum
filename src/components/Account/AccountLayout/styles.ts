import { Container } from "@/styles/components";
import styled from "@emotion/styled";

export const AccountContainer = styled(Container)`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-top: 24px;
`;

export const AccountContent = styled.div`
    grid-column: span 3;
`;