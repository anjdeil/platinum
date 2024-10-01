
import { FC } from "react";
import { SocialItemLink, SocialsContainer } from "./styles";
import Image from "next/image";
import { useAppSelector } from "@/store";

export const Socials: FC/* <> */ = ({ }) => {

    const themeOptions = useAppSelector(state => state.themeOptions);
    const SocialItems = themeOptions.data.item.contacts.socials;
   
    

    /*  if (!SocialItems && skeleton) {
         return (
             <MenuSkeleton
                 elements={skeleton.elements}
                 direction={skeleton.direction}
                 width={skeleton.width}
                 height={skeleton.height}
                 gap={skeleton.gap}
             />
         )
     } */
    // нужен ли тут скелетон?
    return (
        <SocialsContainer>
       
          {SocialItems && SocialItems.map(({ social, link }) => (
                <SocialItemLink href={link} key={social}>
                    <Image
                        src={`/assets/icons/${social}.svg`}
                        alt={social}
                        width={24}
                        height={24}
                        unoptimized={true}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </SocialItemLink>
            ))} 
        </SocialsContainer>

        //пример с картинкой
        /*   <SocialsContainer >
              <SocialItemLink  href="/" >
                      <Image src="/assets/icons/contact_place.svg" alt="Logo" width={24} height={24} unoptimized={true} />
              </SocialItemLink>
              <SocialItemLink href="/"  >
                      <Image src="/assets/icons/contact_place.svg" alt="Logo" width={24} height={24} unoptimized={true} />
              </SocialItemLink>
              <SocialItemLink  href="/" >
                      <Image src="/assets/icons/contact_place.svg" alt="Logo" width={24} height={24} unoptimized={true} />
              </SocialItemLink>
              <SocialItemLink  href="/" >
                      <Image src="/assets/icons/contact_place.svg" alt="Logo" width={24} height={24} unoptimized={true} />
              </SocialItemLink>
          </SocialsContainer> */
    );
};
