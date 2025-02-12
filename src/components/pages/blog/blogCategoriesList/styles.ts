import { StyledButton } from '@/styles/components';
import styled from '@emotion/styled';

export const StyledList = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  row-gap: 16px;
  margin-bottom: 40px;

  @media ${({ theme }) => theme.media.large} {
    margin-bottom: 24px;
  }

  @media ${({ theme }) => theme.media.medium} {
    display: none;
  }
`;

export const StyledOwnButton = styled(StyledButton)`
  height: 56px;
  padding-inline: 24px;
`;

export const FilterCategoryWrapper = styled.div`
  display: none;

  @media ${({ theme }) => theme.media.medium} {
    display: flex;
    width: 100%;
    margin-bottom: 24px;
  }
`;