import React from 'react';
import { Container } from '@/styles/components';
import { SliderSection } from '../SliderSection';
import { ProductListSection } from '../ProductListSection';
import { CategoriesSection } from '../CategoriesSection';
import { InstagramSection } from '../InstagramSection';
import { ReviewsSection } from '../ReviewsSection';
import { NewsletterSection } from '../NewsletterSection';
import { AboutPlatinumSection } from '../AboutPlatinumSection';
import { FeaturesSection } from '../FeaturesSection/FeaturesSection';
import { BlogSection } from '../BlogSection';
import { HeroSection } from '../HeroSection';
import { SplitSection } from '../SplitSection';
import { LoyaltySection } from '../LoyaltySection';
import { ContactsSection } from '../ContactsSection';

import { SectionsType } from '@/types/components/sections';
import { normalizeSlides } from '@/utils/normalizeSlides';

interface SectionRendererProps {
  sections: SectionsType[];
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  sections,
}) => {
  return (
    <>
      {sections.map((section, index) => {
        switch (section._type) {
          case 'slider':
            const normalizedSlides = normalizeSlides(section.slider);
            return <SliderSection key={index} slides={normalizedSlides} />;
          case 'product_list':
            return (
              <Container key={index}>
                <ProductListSection
                  key={index}
                  title={section.title}
                  subtitle={section.subtitle}
                  sort_type={section.sort_type}
                />
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
              <ReviewsSection
                key={index}
                subtitle={section.subtitle}
                title={section.title}
              />
            );
          case 'newsletter':
            return (
              <NewsletterSection
                key={index}
                newsletter_separator={section.newsletter_separator}
              />
            );
          case 'about_platinum':
            return (
              <AboutPlatinumSection
                key={index}
                about_platinum_separator={section.about_platinum_separator}
              />
            );
          case 'features':
            return (
              <FeaturesSection
                key={index}
                subtitle={section.subtitle}
                title={section.title}
                items={section.items}
              />
            );
          case 'blog':
            return (
              <BlogSection
                key={index}
                subtitle={section.subtitle}
                title={section.title}
              />
            );

          case 'hero':
            return (
              <HeroSection
                key={index}
                is_reverse={section.is_reverse}
                image={section.image}
                object_fit={section.object_fit}
                title={section.title}
                text={section.text}
              />
            );
          case 'split':
            return <SplitSection key={section._type} split={section.split} />;

          case 'loyalty':
            return (
              <LoyaltySection
                key={index}
                loyalty_separator={section.loyalty_separator}
              />
            );
          case 'contacts':
            return (
              <ContactsSection
                key={index}
                contacts_separator={section.contacts_separator}
              />
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
