import { PagesNavigation } from '@/styles/components';
import PaginationItem from '@mui/material/PaginationItem';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface PaginationProps {
  page: number;
  count: number;
}

const BlogPagination: React.FC<PaginationProps> = ({ page, count }) => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <PagesNavigation
      page={page}
      count={count}
      hidePrevButton
      hideNextButton
      renderItem={item => {
        const queryParams: Record<string, string | number> = {
          ...router.query,
          page: +(item?.page || 0),
        };

        if (category) {
          queryParams.category = category as string;
        }

        return (
          <PaginationItem
            component={Link}
            href={{
              pathname: '/blog',
              query: queryParams,
            }}
            {...item}
            disabled={item.page === page}
            style={{ backgroundColor: '#F2F8FE' }}
          />
        );
      }}
    />
  );
};

export default BlogPagination;
