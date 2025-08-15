import { Container } from '@/styles/components';
import { AmbassadorProvideSectionData } from '@/types/components/sections';
import { AmbassadorSectionContainer } from '../styles';
import {
  StyledContainer,
  StyledItem,
  StyledList,
  StyledText,
  StyledTitle,
  StyledWrapper,
} from './styles';

type AmbassadorProvideSectionProps = Omit<
  AmbassadorProvideSectionData,
  '_type'
>;

export const AmbassadorProvideSection: React.FC<
  AmbassadorProvideSectionProps
> = ({ title, items }) => {
  return (
    <StyledContainer>
      <AmbassadorSectionContainer>
        <Container>
          <StyledWrapper>
            <StyledTitle>{title}</StyledTitle>
            <StyledList>
              {items.map((item, idx) => (
                <StyledItem key={idx}>
                  <StyledText>{item.item_text}</StyledText>
                </StyledItem>
              ))}
            </StyledList>
          </StyledWrapper>
        </Container>
      </AmbassadorSectionContainer>
    </StyledContainer>
  );
};
