import React from 'react';
import PaginationItem from '@mui/material/PaginationItem';
import Link from 'next/link';
import { PagesNavigation } from '@/styles/components';

interface PaginationProps {
  page: number;
  count: number;
}

const BlogPagination: React.FC<PaginationProps> = ({ page, count }) => {
  return (
    <PagesNavigation
      page={page}
      count={count}
      hidePrevButton
      hideNextButton
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={`/blog?page=${item.page}`}
          {...item}
          disabled={item.page === page}
          style={{ backgroundColor: '#F2F8FE' }}
        />
      )}
    />
  );
};

export default BlogPagination;
