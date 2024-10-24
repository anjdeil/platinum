import ApplePayIcon from "@/components/global/icons/ApplePayIcon/ApplePayIcon";
import BlikIcon from "@/components/global/icons/BlikIcon/BlikIcon";
import GPayIcon from "@/components/global/icons/GPayIcon/GPayIcon";
import MasterCardIcon from "@/components/global/icons/MasterCardIcon/MasterCardIcon";
import PayPalIcon from "@/components/global/icons/PayPalIcon/PayPalIcon";
import PrzelewyIcon from "@/components/global/icons/PrzelewyIcon/PrzelewyIcon";
import VisaIcon from "@/components/global/icons/VisaIcon/VisaIcon";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PaymentListContainer } from "./styles";

const paymentIcons = [
    <PayPalIcon />,
    <GPayIcon />,
    <MasterCardIcon />,
    <BlikIcon />,
    <PrzelewyIcon />,
    <ApplePayIcon />,
    <VisaIcon />,
];

const PaymentList = () =>
{  
    return (
        <PaymentListContainer>
            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                breakpoints={{
                    1024: {
                        slidesPerView: 6,
                    },
                    1200: {
                        slidesPerView: 7,
                        spaceBetween: 30,
                    },
                }}
            >
                {paymentIcons.map((icon, index) => (
                    <SwiperSlide key={index}>{icon}</SwiperSlide>
                ))}
            </Swiper>
        </PaymentListContainer>
    );
};

export default PaymentList;