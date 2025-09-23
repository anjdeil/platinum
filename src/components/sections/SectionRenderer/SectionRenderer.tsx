import { IsMobileScreen } from '@/components/global/isMobileScreenWrapper';
import { Container } from '@/styles/components';
import { SectionsType } from '@/types/components/sections';
import { normalizeSlides } from '@/utils/normalizeSlides';
import { AboutPlatinumSection } from '../AboutPlatinumSection';
import { AmbassadorAboutSection } from '../AmbassadorAboutSection';
import { AmbassadorBenefitsSection } from '../AmbassadorBenefitsSection';
import { AmbassadorHeroSection } from '../AmbassadorHeroSection';
import { AmbassadorImageSection } from '../AmbassadorImageSection';
import { AmbassadorProvideSection } from '../AmbassadorProvideSection';
import { BlogSection } from '../BlogSection';
import { CategoriesSection } from '../CategoriesSection';
import { ContactsSection } from '../ContactsSection';
import { FeaturesSection } from '../FeaturesSection/FeaturesSection';
import { HeroSection } from '../HeroSection';
import { InstagramSection } from '../InstagramSection';
import { LoyaltySection } from '../LoyaltySection';
import { NetworksSection } from '../NetworksSection';
import { NewsletterSection } from '../NewsletterSection';
// import { ProductListSection } from '../ProductListSection';
import { QuestionFormSection } from '../QuestionFormSection';
import { ReviewsSection } from '../ReviewsSection';
import { RichTextSection } from '../RichTextSection';
import { SliderSection } from '../SliderSection';
import { SplitSection } from '../SplitSection';
import { SectionContainer } from '../styles';
import { TitleSection } from '../TitleSection';

interface SectionRendererProps {
  sections: SectionsType[];
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
                                                                  sections,
                                                                }) => {
  const countSplitSections = (sections: any[]): number => {
    return sections.filter(section => section._type === 'split').length;
  };

  const splitSectionCount = countSplitSections(sections);
  const isMoreThen5SectionsSplit = splitSectionCount > 5;

  return (
    <>
      {sections.map((section, index) => {
        switch (section._type) {
          case 'slider':
            const normalizedSlides = normalizeSlides(section.slider);
            return <SliderSection key={index} slides={normalizedSlides} />;
          case 'custom_h1':
            return <TitleSection title={section.title} />;
          case 'product_list':
            return (
              <Container key={index}>
                {/*<ProductListSection*/}
                {/*  key={index}*/}
                {/*  title={section.title}*/}
                {/*  subtitle={section.subtitle}*/}
                {/*  sort_type={section.sort_type}*/}
                {/*/>*/}
              </Container>
            );
          case 'categories':
            return (
              <Container key={index}>
                <CategoriesSection
                  key={index}
                  subtitle={section.subtitle}
                  title={section.title}
                  categories_bars={section.categories_bars}
                />
              </Container>
            );
          case 'instagram':
            return (
              <Container key={index}>
                <InstagramSection
                  key={index}
                  subtitle={section.subtitle}
                  title={section.title}
                />
              </Container>
            );
          case 'reviews':
            return (
              <Container key={index}>
                <ReviewsSection
                  key={index}
                  subtitle={section.subtitle}
                  title={section.title}
                />
              </Container>
            );
          case 'newsletter':
            return (
              <IsMobileScreen key={index}>
                <NewsletterSection />
              </IsMobileScreen>
            );
          case 'about_platinum':
            return <AboutPlatinumSection key={index} />;
          case 'features':
            return (
              <Container key={index}>
                <FeaturesSection
                  key={index}
                  subtitle={section.subtitle}
                  title={section.title}
                  items={section.items}
                />
              </Container>
            );
          case 'blog':
            return (
              <Container key={index}>
                <BlogSection
                  key={index}
                  subtitle={section.subtitle}
                  title={section.title}
                  all_link={section.all_link}
                  below_text={section.below_text}
                />
              </Container>
            );

          case 'ambassador_hero':
            return (
              <Container key={index}>
                <AmbassadorHeroSection
                  key={index}
                  image={section.image}
                  title={section.title}
                  text={section.text}
                  years={section.years}
                  sub_text={section.sub_text}
                />
              </Container>
            );

          case 'ambassador_provide':
            return (
              <AmbassadorProvideSection
                key={index}
                title={section.title}
                items={section.items}
              />
            );

          case 'ambassador_benefits':
            return (
              <Container key={index}>
                <AmbassadorBenefitsSection
                  key={index}
                  title={section.title}
                  items={section.items}
                />
              </Container>
            );

          case 'ambassador_image':
            return <AmbassadorImageSection key={index} image={section.image} />;

          case 'ambassador_about':
            return (
              <Container key={index}>
                <AmbassadorAboutSection
                  key={index}
                  title={section.title}
                  items={section.items}
                  text={section.text}
                  button_text={section.button_text}
                  button_link={section.button_link}
                />
              </Container>
            );

          case 'hero':
            return (
              <Container key={index}>
                <HeroSection
                  key={index}
                  is_reverse={section.is_reverse}
                  image={section.image}
                  object_fit={section.object_fit}
                  title={section.title}
                  text={section.text}
                />
              </Container>
            );
          case 'split':
            return (
              <Container key={index}>
                <SplitSection
                  split={section.split}
                  smallGaps={isMoreThen5SectionsSplit}
                />
              </Container>
            );
          case 'rich_text':
            return (
              <Container key={index}>
                <SectionContainer smallGaps={true}>
                  <RichTextSection text={section.text} />
                </SectionContainer>
              </Container>
            );
          case 'loyalty':
            return (
              <Container key={index}>
                <SectionContainer>
                  <LoyaltySection key={index} />
                </SectionContainer>
              </Container>
            );
          case 'contacts':
            return (
              <Container key={index}>
                <ContactsSection />
              </Container>
            );
          case 'question_form':
            return (
              <Container key={index}>
                <QuestionFormSection />
              </Container>
            );
          case 'networks':
            return (
              <Container key={index}>
                <NetworksSection
                  subtitle={section.subtitle}
                  title={section.title}
                />
              </Container>
            );
          default:
            return (
              <Container key={index}>
                <p>Unknown section type</p>
              </Container>
            );
        }
      })}
    </>
  );
};
