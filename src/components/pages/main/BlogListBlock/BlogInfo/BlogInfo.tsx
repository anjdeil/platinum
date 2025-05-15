import { useTransformDate } from '@/hooks/useTransformDate';
import { FC } from 'react';
import {
  StyledDate,
  StyledInfo,
  StyledViewCount,
  StyledViewCountNumber,
} from './styles';
import Image from 'next/image';

interface BlogInfoProps {
  created: string;
  views_count: number;
  postPage?: boolean;
}

const BlogInfo: FC<BlogInfoProps> = ({ created, views_count, postPage }) => {
  const formatDate = useTransformDate(created);

    const formatViewCount = (count?: number): string => {
      if (count === undefined || count === null) {
        return '0';
      }
      if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
      }
      return count.toString();
    };

  return (
    <StyledInfo postPage={postPage}>
      <StyledDate>{formatDate}</StyledDate>
      <StyledViewCount>
        <Image
          src="/assets/icons/eye.svg"
          alt="Post view count"
          width={16}
          height={16}
        />
        <StyledViewCountNumber>
          {formatViewCount(views_count)}
        </StyledViewCountNumber>
      </StyledViewCount>
    </StyledInfo>
  );
};

export default BlogInfo;
