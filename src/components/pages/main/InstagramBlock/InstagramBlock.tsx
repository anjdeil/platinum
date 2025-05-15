import InstagramIcon from "@/components/global/icons/InstagramIcon/InstagramIcon";
import {
  IconWrapper,
  InstagramAccountWrapper,
  InstagramBlockContainer,
  InstagramPhoto,
  InstagramPhotoWrapper,
  StyledSkeleton,
  StyledSkeletonContainer,
} from './styles';
import {
  InstagramApiResponseSchema,
  MediaInfoResponse,
} from '@/types/services';

import { useGetInstagramMediaQuery } from '@/store/rtk-queries/instagramMedia';
import { SectionContainer, StyledError } from '@/components/sections/styles';

const InstagramBlock = () => {
  const { data, error, isFetching, isLoading } = useGetInstagramMediaQuery();
  const isComponentLoading = isLoading || isFetching;

  const mediaNotFound = (
    <SectionContainer>
      <StyledError>Instagram Media not found</StyledError>
    </SectionContainer>
  );

  let media: MediaInfoResponse[] = [];

  if (data) {
    const validationResult = InstagramApiResponseSchema.safeParse(data);
    if (!validationResult.success) {
      console.error('Invalid data format:', validationResult.error);
      return (
        <SectionContainer>
          <StyledError>Invalid Instagram Media data</StyledError>
        </SectionContainer>
      );
    }
    media = validationResult.data;
  }

  if (isComponentLoading) {
    return (
      <>
        <StyledSkeletonContainer>
          {[...Array(4)].map((_, index) => (
            <StyledSkeleton key={index} variant="rectangular" />
          ))}
        </StyledSkeletonContainer>
      </>
    );
  }

  if (error) {
    return mediaNotFound;
  }

  return (
    <>
      <InstagramBlockContainer>
        <InstagramAccountWrapper
          href="https://www.instagram.com/platinum_poland/"
          target="_blank"
        >
          <IconWrapper>
            <InstagramIcon />
          </IconWrapper>
          <p>platinum_poland</p>
        </InstagramAccountWrapper>
        {media &&
          media.length > 0 &&
          media.map(item => (
            <InstagramPhotoWrapper
              href={item.permalink}
              key={item.id}
              target="_blank"
            >
              <InstagramPhoto
                src={
                  item.media_type === 'VIDEO'
                    ? item.thumbnail_url ||
                      '/assets/images/product-placeholder.webp'
                    : item.media_url ||
                      '/assets/images/product-placeholder.webp'
                }
                alt={item.username}
                width={308}
                height={308}
                priority
              />
            </InstagramPhotoWrapper>
          ))}
      </InstagramBlockContainer>
    </>
  );
};

export default InstagramBlock;