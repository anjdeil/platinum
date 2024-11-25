import { useAppDispatch } from "@/store";
import { useCreateOrderMutation } from "@/store/rtk-queries/wooCustomApi";
import { setCurrentOrder } from "@/store/slices/currentOrder";
import { registrationUserDataType } from "@/types/pages/checkout";
import { CartItem } from "@/types/store/reducers/сartSlice";
import { useState, useCallback } from "react";
import { useCookies } from "react-cookie";


type OrderStatus = "pending" | "processing" | "on-hold" | "completed" | "cancelled" | "refunded" | "failed";

export const useCreateOrderWoo = () => {
    const dispatch = useAppDispatch();
    const [fetchCreateOrder, { data: createdOrder }] = useCreateOrderMutation();
    const [error, setError] = useState<string | null>(null);
  
     const [_, setCookie] = useCookies(['orderId']); 
    
    const createOrder = useCallback(async (items: CartItem[], status: OrderStatus, shipping_lines: /* ShippingLine[] =  */[], userFields?:  registrationUserDataType |  null,) => {
        setError(null);
        const fetchCreateOrderBody = {
            line_items: items,
            payment_method: "bacs",
            payment_method_title: "Przelew bankowy",
            status: status,
            customer_id: userFields && userFields.id ? userFields.id : 0,
            billing: {
                ...userFields?.billing,
            },
            shipping: {
                ...userFields?.shipping,
            },
            shipping_lines: shipping_lines
        };

        try {
            const createOrderData = await fetchCreateOrder(fetchCreateOrderBody).unwrap();
            if ('id' in createOrderData) {
                setCookie('orderId', createOrderData.id,
                    {
                        path: '/',
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)
                    });
                dispatch(setCurrentOrder(createOrderData.id));
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                /* const createOrderError = error as WpWooError; */
                setError(/* createOrderError?.data?.message || */ 'Failed to create order');
            }
            console.error(error, 'Failed to create order');
        }
      
    }, [dispatch, fetchCreateOrder]);

    return { createOrder, error, createdOrder };
};