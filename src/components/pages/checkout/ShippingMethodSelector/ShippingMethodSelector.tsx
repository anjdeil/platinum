

import { useTranslations } from "next-intl";
import {
    ShippingMethodSelectorLabel,
    ShippingMethodSelectorMethod,
    ShippingMethodSelectorMethodContent,
    ShippingMethodSelectorMethodCost,
    ShippingMethodSelectorMethodDetail,
    ShippingMethodSelectorMethodEstimate,
    ShippingMethodSelectorMethodLocker,
    ShippingMethodSelectorMethodLockerAddress,
    ShippingMethodSelectorMethodLockerChangeButton,
    ShippingMethodSelectorMethodLockerDescription,
    ShippingMethodSelectorMethodLockerDetail,
    ShippingMethodSelectorMethodLockerName,
    ShippingMethodSelectorMethodLockerWrapper,
    ShippingMethodSelectorMethodName,
    ShippingMethodSelectorMethodNaming,
    ShippingMethodSelectorMethodRadio,
    ShippingMethodSelectorMethodRadioBox,
    ShippingMethodSelectorMethods,
    ShippingMethodSelectorNotification,
    ShippingMethodSelectorTitle,
    ShippingMethodSelectorWrapper
} from "./style";
import { ShippingMethodType } from "@/types/services";
import ShippingMethodSelectorSkeleton from "./ShippingMethodSelectorSkeleton";
import { ParcelMachineType } from "@/types/pages/checkout";
import { useState } from "react";
import { CustomRequired } from "@/components/global/forms/CustomFormInput/styles";

export default function ShippingMethodSelector({
    methods,
    isLoading,
    parcelMachinesMethods,
    parcelMachine,
    onParcelMachineChange
}: {
    methods: ShippingMethodType[],
    isLoading: boolean,
    parcelMachinesMethods: string[],
    parcelMachine?: ParcelMachineType,
    onParcelMachineChange: (methodId: string) => void
}) {
    const t = useTranslations("ShippingMethodSelector");
    const [choosenMethod, setChoosenMethod] = useState<string>('');

    const isParcelMachineCollapsed = (methodId: string) => {
        return choosenMethod === methodId && parcelMachinesMethods.includes(methodId);
    }

    return (
        <ShippingMethodSelectorWrapper>
            <ShippingMethodSelectorTitle as={"h2"}>{t('delivery')}</ShippingMethodSelectorTitle>

            {isLoading ?
                <ShippingMethodSelectorSkeleton />
                : Boolean(methods.length) ?
                    <ShippingMethodSelectorMethods>
                        {methods.map(({ method_id, title }) => (
                            <ShippingMethodSelectorMethod key={method_id}>
                                <ShippingMethodSelectorMethodRadio
                                    type="radio"
                                    name="shippingMethod"
                                    value={method_id}
                                    checked={choosenMethod === method_id}
                                    onChange={() => setChoosenMethod(method_id)}
                                />
                                <ShippingMethodSelectorMethodContent className="ShippingMethodSelectorMethodContent">
                                    <ShippingMethodSelectorMethodDetail>
                                        <ShippingMethodSelectorMethodRadioBox className="ShippingMethodSelectorMethodRadioBox" />
                                        <ShippingMethodSelectorMethodNaming>
                                            <ShippingMethodSelectorMethodName>{title}</ShippingMethodSelectorMethodName>
                                            <ShippingMethodSelectorMethodEstimate>2 - 4 working days</ShippingMethodSelectorMethodEstimate>
                                        </ShippingMethodSelectorMethodNaming>
                                        <ShippingMethodSelectorMethodCost>0 zł</ShippingMethodSelectorMethodCost>
                                    </ShippingMethodSelectorMethodDetail>
                                    {isParcelMachineCollapsed(method_id) &&
                                        <ShippingMethodSelectorMethodLockerWrapper>
                                            {parcelMachine?.methodId === method_id ?
                                                <ShippingMethodSelectorMethodLocker>
                                                    <ShippingMethodSelectorMethodLockerDetail>
                                                        <ShippingMethodSelectorMethodLockerName>{parcelMachine.choosenParcelMachine.name}</ShippingMethodSelectorMethodLockerName>
                                                        <ShippingMethodSelectorMethodLockerAddress>{parcelMachine.choosenParcelMachine.address}</ShippingMethodSelectorMethodLockerAddress>
                                                        <ShippingMethodSelectorMethodLockerDescription>{parcelMachine.choosenParcelMachine.description}</ShippingMethodSelectorMethodLockerDescription>
                                                    </ShippingMethodSelectorMethodLockerDetail>
                                                    <ShippingMethodSelectorMethodLockerChangeButton onClick={() => onParcelMachineChange(method_id)}>
                                                        {t('change')}
                                                    </ShippingMethodSelectorMethodLockerChangeButton>
                                                </ShippingMethodSelectorMethodLocker>
                                                :
                                                <>
                                                    <ShippingMethodSelectorLabel>
                                                        {t('parcelLocker')} <CustomRequired>*</CustomRequired>
                                                    </ShippingMethodSelectorLabel>
                                                    <ShippingMethodSelectorMethodLockerChangeButton onClick={() => onParcelMachineChange(method_id)}>
                                                        {t('selectParcelLocker')}
                                                    </ShippingMethodSelectorMethodLockerChangeButton>
                                                </>
                                            }
                                        </ShippingMethodSelectorMethodLockerWrapper>
                                    }
                                </ShippingMethodSelectorMethodContent>
                            </ShippingMethodSelectorMethod>

                        ))}
                    </ShippingMethodSelectorMethods>
                    :
                    <ShippingMethodSelectorNotification>{t('deliveryUnavailable')}</ShippingMethodSelectorNotification>
            }
        </ShippingMethodSelectorWrapper>

    );
}
