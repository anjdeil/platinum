import { useEffect, useState } from 'react';
import axios from 'axios';
import InstagramIcon from '@/components/global/icons/InstagramIcon/InstagramIcon';
import { IconWrapper, InstgramAccountWrapper, InstgramBlockContainer, InstgramPhoto, InstgramPhotoWrapper } from './styles';
import TitleBlock from "@/components/global/TitleBlock/TitleBlock";

const InstagramBlock = () => {
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);

    /*     useEffect(() => {
            const fetchPhotos = async () => {
                try {
                    const response = await axios.get('/api/instagram');
                    setPhotos(response.data.data);
                } catch (error) {
                    setError(error.message);
                }
            };
    
            fetchPhotos();
        }, []);
    
        if (error) {
            return <div>Error: {error}</div>;
        } */

    return (
        <>
            <TitleBlock subTitle="socialMedia" title="followUs" />
            <InstgramBlockContainer>

                <InstgramAccountWrapper href='#'>
                    <IconWrapper>
                        <InstagramIcon />
                    </IconWrapper>
                    <p>platinum_poland</p>
                    {/* {user} */}
                </InstgramAccountWrapper>

                <InstgramPhotoWrapper href='#' /* key={photo.id} */>
                    <InstgramPhoto src='/assets/images/1.png' alt='12' />
                </InstgramPhotoWrapper>
                <InstgramPhotoWrapper href='#' /* key={photo.id} */>
                    <InstgramPhoto src='/assets/images/2.png' alt='12' />

                </InstgramPhotoWrapper>
                <InstgramPhotoWrapper href='#' /* key={photo.id} */>
                    <InstgramPhoto src='/assets/images/4.jpg' alt='12' />

                </InstgramPhotoWrapper>

                {/*    {photos.map((photo) => (
<InstgramPhotoWrapper href={#} key={photo.id}>
    <InstgramPhoto src={photo.media_url} alt={photo.caption} />
</InstgramPhotoWrapper>
))} */}
            </InstgramBlockContainer>
        </>

    );
};

export default InstagramBlock;
