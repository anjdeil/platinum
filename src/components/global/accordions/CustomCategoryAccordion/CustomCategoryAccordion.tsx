import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import {
  StyledSortAccordion,
  StyledSortAccordionSummary,
  StyledSortDetails,
  StyledSortItem,
  StyledText,
} from './styles';

type Category = {
  name: string;
  slug: string;
};

type CustomCategoryAccordionProps = {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory(name: string | null): void;
};

export const CustomCategoryAccordion = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CustomCategoryAccordionProps) => {
  const accordionRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations('BlogPostPage');

  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded);
  };

  const handleSelectCategory = (slug: string | null) => {
    setSelectedCategory(slug);
    setExpanded(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accordionRef.current &&
        !accordionRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <StyledSortAccordion
      ref={accordionRef}
      disableGutters
      expanded={expanded}
      onChange={handleAccordionChange}
    >
      <StyledSortAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <StyledText>
          {selectedCategory
            ? categories.find(category => category.slug === selectedCategory)
                ?.name
            : t('selectCategory')}
        </StyledText>
      </StyledSortAccordionSummary>
      <StyledSortDetails ref={detailsRef}>
        <StyledSortItem
          isSelected={selectedCategory === null}
          onClick={() => handleSelectCategory(null)}
        >
          All
        </StyledSortItem>
        {categories.map(category => (
          <StyledSortItem
            key={category.slug}
            isSelected={selectedCategory === category.slug}
            onClick={() => handleSelectCategory(category.slug)}
          >
            {category.name}
          </StyledSortItem>
        ))}
      </StyledSortDetails>
    </StyledSortAccordion>
  );
};
