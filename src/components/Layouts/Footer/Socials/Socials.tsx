
import { FC } from "react";
import { SocialItemLink, SocialsContainer } from "./styles";
import Image from "next/image";

interface SocialItem {
    svg_name: string;
    link: string;
}

export const Socials: FC/* <> */ = ({ }) => {

    //const SocialItems = запрос ? или из контекста;
    const SocialItems: SocialItem[]  | undefined  = []

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
        {SocialItems && SocialItems.map(({ svg_name, link }) => (
            <SocialItemLink href={link} key={svg_name}>
                <Image src={`/assets/icons/${svg_name}.svg`} alt={svg_name} width={24} height={24} unoptimized={true} />
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
