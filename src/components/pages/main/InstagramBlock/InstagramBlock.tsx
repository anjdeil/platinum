import { useEffect, useState } from 'react';
import axios from 'axios';
import InstagramIcon from '@/components/global/icons/InstagramIcon/InstagramIcon';
import { IconWrapper, InstgramAccountWrapper, InstgramBlockContainer,  InstgramPhoto, InstgramPhotoWrapper } from './styles';
import TitleBlock from "@/components/global/TitleBlock/TitleBlock";
import { useFetchPhotoQuery } from '@/store/rtk-queries/InstCustomApi';
import { Box, Skeleton } from '@mui/material';

const InstagramBlock = () => {
    const { data: photos, error, isLoading } = useFetchPhotoQuery();

    const fload = true;

   /*   if (error) {
          return <div></div>;
      }  */

    return (
      <>
        <InstgramBlockContainer>
          <InstgramAccountWrapper href='#'>
            <IconWrapper>
              <InstagramIcon />
            </IconWrapper>
            <p>platinum_poland</p>
            {/* {user} */}
          </InstgramAccountWrapper>
          {fload ? (
            <>
              {[...Array(3)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant='rounded'
                  width='100%'
                  height='100%'
                />
              ))}
            </>
          ) : (
            <>
              <InstgramPhotoWrapper href='#' /* key={photo.id} */>
                <InstgramPhoto src='/assets/images/1.png' alt='12' />
              </InstgramPhotoWrapper>
              <InstgramPhotoWrapper href='#' /* key={photo.id} */>
                <InstgramPhoto src='/assets/images/2.png' alt='12' />
              </InstgramPhotoWrapper>
              <InstgramPhotoWrapper href='#' /* key={photo.id} */>
                <InstgramPhoto src='/assets/images/4.jpg' alt='12' />
              </InstgramPhotoWrapper>
            </>
          )}
          {/*     {photos.map((photo) => (
                    <InstgramPhotoWrapper href={photo.permalink} key={photo.id}>
                        <InstgramPhoto src={photo.media_url} alt={photo.caption} />
                    </InstgramPhotoWrapper>
                ))}
                 */}
        </InstgramBlockContainer>
      </>
    );
};

export default InstagramBlock;
