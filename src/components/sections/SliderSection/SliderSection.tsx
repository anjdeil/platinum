import Image from 'next/image';
import Link from 'next/link';
import { ImageWrapper, StyledContainer, StyledSlider } from './styles';

interface SliderItem {
  _type: string;
  image_desc: string;
  image_mob: string;
  text: string;
  url: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

interface SliderSectionProps {
  slider: SliderItem[];
}

export const SliderSection: React.FC<SliderSectionProps> = ({ slider }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <StyledContainer>
      <StyledSlider {...settings}>
        {slider.map((item, index) => (
          <div key={index}>
            <ImageWrapper>
              <Image
                src={item.image_desc}
                alt={item.text}
                priority
                width={1440}
                height={525}
                className='desktopImage'
                sizes='(min-width: 769px) 100vw 316px'
              />
              <Image
                src={item.image_mob}
                alt={item.text}
                priority
                width={340}
                height={519}
                className='mobileImage'
              />
            </ImageWrapper>
            <div>
              {item.title && <h2>{item.title}</h2>}
              {item.subtitle && <p>{item.subtitle}</p>}
              {item.buttonText && (
                <Link href={item.url}>{item.buttonText}</Link>
              )}
            </div>
          </div>
        ))}
      </StyledSlider>
    </StyledContainer>
  );
};
