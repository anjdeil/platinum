import { useAppSelector } from "@/store";
import Image from "next/image";
import { FC } from "react";
import { SocialItemLink, SocialsContainer, SocialText } from "./styles";
import { SocialsProps } from "@/types/menus/socials";

export const Socials: FC<SocialsProps> = ({ iconscolor, text, margin, itemmargin }) =>
{

    const themeOptions = useAppSelector(state => state.themeOptions);
    const SocialItems = themeOptions.data.item.contacts.socials;

    return (
        <SocialsContainer margin={margin}>
            {SocialItems && SocialItems.map(({ social, link }) => (
                <SocialItemLink href={link} key={social} itemmargin={itemmargin}>
                    <Image
                        src={`/assets/icons/${iconscolor === 'dark' ? 'dark-' : ''}${social}.svg`}
                        alt={social}
                        width={24}
                        height={24}
                        unoptimized={true}
                        onError={(e) =>
                        {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    {text && <SocialText>{social}</SocialText>}
                </SocialItemLink>
            ))}
        </SocialsContainer>
    );
};
