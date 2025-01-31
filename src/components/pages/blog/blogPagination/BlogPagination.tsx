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
        const queryParams: Record<string, string | number> = {};

        if (category) {
          queryParams.category = Array.isArray(category)
            ? category[0]
            : category;
        }

        if (item.page && item.page !== 1) {
          queryParams.page = item.page;
        } else {
          delete queryParams.page;
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
