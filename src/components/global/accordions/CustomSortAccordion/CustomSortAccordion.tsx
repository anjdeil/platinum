import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  StyledSortAccordion,
  StyledSortAccordionSummary,
  StyledSortDetails,
  StyledSortItem,
  StyledText,
} from './styles';

export const CustomSortAccordion = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accordionRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations('Archive');

  const currentSort = useMemo(() => {
    const orderBy = searchParams.get('order_by');
    const order = searchParams.get('order');

    if (orderBy === 'min_price') {
      return order === 'asc' ? 'cheapest' : 'expensive';
    }
    if (orderBy === 'created') {
      return 'new';
    }

    return 'stocks';
  }, [searchParams]);

  const sorts = [
    {
      name: 'stocks',
      label: t('stocks'),
    },
    {
      name: 'new',
      label: t('new'),
    },
    {
      name: 'cheapest',
      label: t('cheapest'),
    },
    {
      name: 'expensive',
      label: t('expensive'),
    },
  ];

  const [expanded, setExpanded] = useState(false);
  const [accordionWidth, setAccordionWidth] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const getMaxWidth = () => {
      if (detailsRef.current) {
        const items = Array.from(detailsRef.current.children) as HTMLElement[];
        const maxWidth = Math.max(...items.map(item => item.offsetWidth || 0));
        setAccordionWidth(maxWidth);
      }
    };

    getMaxWidth();

    window.addEventListener('resize', getMaxWidth);

    return () => {
      window.removeEventListener('resize', getMaxWidth);
    };
  }, [currentSort]);

  const handleSortChange = useCallback(
    (sort: string) => {
      const { slugs, ...params } = router.query;
      if (!Array.isArray(slugs)) return;

      const newSlugs = slugs.filter(
        slug => slug !== 'page' && Number.isNaN(+slug)
      );
      
      if (sort === 'stocks') {
        const { order_by, order, ...restParams } = params;
        router.push({
          pathname: router.pathname,
          query: { slugs: newSlugs, ...restParams },
        });
        setExpanded(false);
        return;
      }

      let newSortParams = {};

      switch (sort) {
        case 'new':
          newSortParams = { order_by: 'created', order: 'desc' };
          break;
        case 'cheapest':
          newSortParams = { order_by: 'min_price', order: 'asc' };
          break;
        case 'expensive':
          newSortParams = { order_by: 'min_price', order: 'desc' };
          break;
        default:
          break;
      }

      router.push({
        pathname: router.pathname,
        query: { ...router.query, slugs: newSlugs, ...newSortParams },
      });

      setExpanded(false);
    },
    [router]
  );

  const handleAccordionChange = (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded);
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
      style={{ minWidth: accordionWidth }}
    >
      <StyledSortAccordionSummary
        expanded={expanded}
        expandIcon={<ExpandMoreIcon />}
      >
        <StyledText>
          {sorts.find(sort => sort.name === currentSort)?.label}
        </StyledText>
      </StyledSortAccordionSummary>
      <StyledSortDetails ref={detailsRef}>
        {sorts.map((sort, index) => (
          <StyledSortItem
            key={sort.name}
            isSelected={currentSort === sort.name}
            onClick={() => handleSortChange(sort.name)}
          >
            {sort.label}
          </StyledSortItem>
        ))}
      </StyledSortDetails>
    </StyledSortAccordion>
  );
};
