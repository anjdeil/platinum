import { BgContainer, Button, FlexContainer, GridContainer, GridItemContainer, HeaderImage, Input, MainTitle, MainTitleText } from "@/styles/components";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600'] });

export default function Home() {
  return (
    <main
      className={`${montserrat.className}`}
    >
      <BgContainer height="100dvh" padding="50px 0 0">
        <GridContainer height="100%">
          <GridItemContainer height="100%" col={{ md: 'span 7' }}>
            <FlexContainer direction="column" justifyContent="center" gap={0}>
              <MainTitleText>welcome to platinum shop</MainTitleText>
              <MainTitle>The best <br />
                product for you</MainTitle>
              <Button color="#fff" width={{ xs: '160px', lg: '257px' }} onClick={() => { alert('Clicked Outline') }}>
                Add to basket
              </Button>
            </FlexContainer>
          </GridItemContainer>
          <GridItemContainer col={{ md: 'span 3' }} row={{ xs: '2 / 3', md: '1 / 2' }}>
            <HeaderImage src="/assets/images/header_girl.png" alt="girl" />
          </GridItemContainer>
        </GridContainer>
      </BgContainer >
      <GridContainer>
        <GridItemContainer col={{ md: "span 4" }}>
          <Button color="#fff" onClick={() => { alert('Clicked Outline') }}>
            Outline
          </Button>
        </GridItemContainer>
        <Button type="fill" color="#fff" onClick={() => { alert('Clicked Fill') }}>
          Fill
        </Button>
        <Button width={{ lg: '257px' }} disabled={true}>
          Disabled
        </Button>
      </GridContainer>
      <FlexContainer justifyContent="center" direction="column">
        <Input type="text" placeholder="Search" />
        <Input error={true} type="text" placeholder="Error" />
      </FlexContainer>
    </main >
  );
}
