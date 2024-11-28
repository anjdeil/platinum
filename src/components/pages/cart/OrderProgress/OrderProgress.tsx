import { useTranslations } from 'next-intl';
import React, { FC } from 'react';
import { useRouter } from 'next/router';
import ForwardArrow from '@/components/global/icons/ForwardArrow/ForwardArrow';
import {
    OrderProgressContainer,
    OrderProgressWrapper,
    OrderStepNum,
    OrderStepWrapper,
    OrderStepWrapperLink
} from './style';

interface OrderProgressLink {
    name: string;
    url: string;
}

const steps: OrderProgressLink[] = [
    { name: 'Basket', url: '/cart' },
    { name: 'PersonalInformation', url: '/cart/userInfo' },
    { name: 'Confirmation', url: '/cart/order' }
];

const OrderProgress: FC = () => {
    const t = useTranslations('Cart');
    const { pathname } = useRouter();

    return (
        <OrderProgressContainer>
            <OrderProgressWrapper>
                {steps.map((step, index) => {
                    const isCurrent = step.url === pathname;
                    const StepContent = (
                        <>
                            <OrderStepNum active={isCurrent}>{index + 1}</OrderStepNum>
                            <p>{t(step.name)}</p>
                        </>
                    );
                    return (
                        <React.Fragment key={step.url}>
                            {isCurrent ? (
                                <OrderStepWrapper>{StepContent}</OrderStepWrapper>
                            ) : (
                                <OrderStepWrapperLink href={step.url}>{StepContent}</OrderStepWrapperLink>
                            )}

                            {index < steps.length - 1 && <ForwardArrow />}
                        </React.Fragment>
                    );
                })}
            </OrderProgressWrapper>
        </OrderProgressContainer>
    );
};

export default OrderProgress;
