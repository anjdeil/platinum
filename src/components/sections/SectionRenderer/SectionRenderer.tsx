import React from 'react';
import { Container } from '@/styles/components';
import { SliderSection } from '../SliderSection';
import { BestsellerSection } from '../BestsellerSection';
import { NewProductSection } from '../NewProductSection';
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
            return <SliderSection key={index} slider={section.slider} />;
          case 'product_list':
            return (
              <BestsellerSection
                key={section.subtitle}
                subtitle={section.subtitle}
                title={section.title}
                products={section.products}
              />
            );
          case 'product_list':
            return (
              <NewProductSection
                key={section.subtitle}
                subtitle={section.subtitle}
                title={section.title}
                products={section.products}
              />
            );
          case 'categories':
            return (
              <CategoriesSection
                key={section._type}
                subtitle={section.subtitle}
                title={section.title}
              />
            );
          case 'instagram':
            return (
              <InstagramSection
                key={section._type}
                subtitle={section.subtitle}
                title={section.title}
              />
            );
          case 'reviews':
            return (
              <ReviewsSection
                key={section._type}
                subtitle={section.subtitle}
                title={section.title}
              />
            );
          case 'newsletter':
            return (
              <NewsletterSection
                key={section._type}
                newsletter_separator={section.newsletter_separator}
              />
            );
          case 'about_platinum':
            return (
              <AboutPlatinumSection
                key={section._type}
                about_platinum_separator={section.about_platinum_separator}
              />
            );
          case 'features':
            return (
              <FeaturesSection
                key={section._type}
                subtitle={section.subtitle}
                title={section.title}
                items={section.items}
              />
            );
          case 'blog':
            return (
              <BlogSection
                key={section.subtitle}
                subtitle={section.subtitle}
                title={section.title}
              />
            );

          case 'hero':
            return (
              <HeroSection
                key={section._type}
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
                key={section._type}
                loyalty_separator={section.loyalty_separator}
              />
            );
          case 'contacts':
            return (
              <ContactsSection
                key={section._type}
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
