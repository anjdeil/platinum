import { LogoLinkImage } from '@/styles/components';
import {
  ContentContainer,
  LogoWrapper,
  StyledCard,
  StyledContainer,
  Wrapper,
} from './styles';

const Maintenance = () => {
  return (
    <Wrapper>
      <StyledContainer>
        <StyledCard>
          <LogoWrapper>
            <LogoLinkImage
              src="/assets/icons/logo.png"
              alt="Logo"
              width={92}
              height={70}
            />
          </LogoWrapper>
          <ContentContainer>
            <h1>Przerwa techniczna</h1>
            <p>
              Pracujemy nad ulepszeniami naszej strony, aby korzystanie z niej
              było dla Państwa jeszcze przyjemniejsze.
            </p>

            <p>
              Jeśli coś chwilowo nie działa – prosimy o wyrozumiałość, wrócimy
              niebawem!
            </p>

            <p>W razie pytań lub potrzeby kontaktu jesteśmy dostępni:</p>

            <p>
              📞 Telefon:
              <a href="tel:+48883462736">+48 883 462 736</a>
            </p>

            <p>
              ✉️ Instagram:
              <a
                href="https://www.instagram.com/platinum_poland"
                target="_blank"
                rel="noopener noreferrer"
              >
                @platinum_poland
              </a>
            </p>

            <p>
              Dziękujemy za cierpliwość i zaufanie – jesteśmy tu dla Państwa 💙
            </p>
          </ContentContainer>
        </StyledCard>
      </StyledContainer>
    </Wrapper>
  );
};

export default Maintenance;
