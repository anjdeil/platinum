import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyledSortAccordion, StyledSortAccordionSummary, StyledSortDetails, StyledSortItem, StyledText } from './styles';

export const CustomSortAccordion = () =>
{
    const searchParams = useSearchParams();
    const router = useRouter();
    const accordionRef = useRef<HTMLDivElement | null>(null);

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
            label: 'Sort by stock availability'
        },
        {
            name: 'new',
            label: 'Sort by newest'
        },
        {
            name: 'cheapest',
            label: 'Sort by cheapest'
        },
        {
            name: 'expensive',
            label: 'Sort by most expensive'
        },
    ];

    const [expanded, setExpanded] = useState(false);

    const handleSortChange = useCallback(
        (sort: string) => {
            const { slugs, order_by, order, ...params } = router.query;
            if (!Array.isArray(slugs)) return;

            if (sort === "stocks") {
                router.push({
                    pathname: router.pathname,
                    query: { slugs, ...params },
                });
                setExpanded(false);
                return;
            }

            let newSortParams = {};

            switch (sort) {
                case "new":
                    newSortParams = { order_by: "created", order: "asc" };
                    break;
                case "cheapest":
                    newSortParams = { order_by: "min_price", order: "asc" };
                    break;
                case "expensive":
                    newSortParams = { order_by: "min_price", order: "desc" };
                    break;
                case "stocks":
                    router.push({
                        pathname: router.pathname,
                        query: { slugs, ...params },
                    });
                    setExpanded(false);
                    return;
                default:
                    break;
            }

            router.push({
                pathname: router.pathname,
                query: { ...router.query, ...newSortParams },
            });

            setExpanded(false);
        },
        [router]
    );


    const handleAccordionChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (accordionRef.current && !accordionRef.current.contains(event.target as Node)) {
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
        <StyledSortAccordionSummary expanded={expanded} expandIcon={<ExpandMoreIcon />}>
            <StyledText>
                {sorts.find(sort => sort.name === currentSort)?.label}
            </StyledText>
        </StyledSortAccordionSummary>
        <StyledSortDetails>
            {sorts.map((sort) => (
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
