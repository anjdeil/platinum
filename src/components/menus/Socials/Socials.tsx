import { useAppSelector } from "@/store";
import { FC } from "react";
import { SocialItemLink, SocialsContainer, SocialText } from "./styles";
import { SocialsProps } from "@/types/menus/Socials";
import FacebookIcon from "@/components/global/icons/socials/FacebookIcon/FacebookIcon";
import InstagramIcon from "@/components/global/icons/socials/InstagramIcon/InstagramIcon";
import PinterestIcon from "@/components/global/icons/socials/PinterestIcon/PinterestIcon";
import TikTokIcon from "@/components/global/icons/socials/TikTokIcon/TikTokIcon";
import YouTubeIcon from "@/components/global/icons/socials/YouTubeIcon/YouTubeIcon";
import { Skeleton } from "@mui/material";

export const Socials: FC<SocialsProps> = ({
    iconscolor, text, margin, itemmargin, textcolor
}) => {
    const themeOptions = useAppSelector(state => state.themeOptions);
    const SocialItems = themeOptions.data.item.contacts.socials;

    // Функция для рендеринга иконок
    const renderIcon = (social: string) => {
        switch (social) {
            case 'facebook':
                return <FacebookIcon fill={iconscolor} />;
            case 'instagram':
                return <InstagramIcon fill={iconscolor} />;
            case 'pinterest':
                return <PinterestIcon fill={iconscolor} />;
            case 'tiktok':
                return <TikTokIcon fill={iconscolor} />;
            case 'youtube':
                return <YouTubeIcon fill={iconscolor} />;
            default:
                return null;
        }
    };

    const isSocialsDataAvailable = SocialItems && SocialItems.length > 0;

    return (
        <SocialsContainer margin={margin}>
            {isSocialsDataAvailable ? (
                SocialItems.map(({ social, link }) => (
                    <SocialItemLink href={link} key={social} itemmargin={itemmargin}>
                        {renderIcon(social)}
                        {text && <SocialText textcolor={textcolor}>{social}</SocialText>}
                    </SocialItemLink>
                ))
            ) : (
                <Skeleton width="60%" height="30px" />
            )}
        </SocialsContainer>
    );
};
