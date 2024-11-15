import React, { useEffect, useState } from 'react';
import { useCreateOrderMutation } from '@/store/rtk-queries/wooCustomApi';
import { CreateOrderRequestType, CreateOrderResponseType } from '@/types/services';
import { useAppSelector, useAppDispatch } from '@/store';
import { updateCart } from '@/store/slices/cartSlice';
import { CartImgWrapper, CartItemImg, CartTableCell, CartTableHead, CartTableTable, CartTableWrapper, QuantityBlock, QuantityWrapper } from './style';

const CartTable = () => {
    const [createOrder, { data: createdOrder, error }] = useCreateOrderMutation();
    const [orderItems, setOrderItems] = useState<CreateOrderResponseType['line_items']>([]);
    const dispatch = useAppDispatch();

    const { cartItems: items } = useAppSelector(state => state.cartSlice);

    const status: CreateOrderRequestType['status'] = "on-hold";

    useEffect(() => {
        const handleCreateOrder = async () => {
            const requestData = {
                line_items: items,
                status: status,
            };
            try {
                const response = await createOrder(requestData).unwrap();
                setOrderItems(response.line_items);
            } catch (err) {
                console.error('Failed to create order:', err);
            }
        };

        handleCreateOrder();
    }, [createOrder, items, status]);
/* 
    if (error) {
        return <p>Error: {error.message}</p>;
    }
 */
    if (!createdOrder) {
        return <p>Loading...</p>;
    }

    const handleIncreaseQuantity = (product_id: number, variation_id?: number) => {
        const updatedItem = items.find(item => item.product_id === product_id && (!variation_id || item.variation_id === variation_id));
        if (updatedItem) {
            dispatch(updateCart({ product_id, variation_id, quantity: updatedItem.quantity + 1 }));
        }
    };

    const handleDecreaseQuantity = (product_id: number, variation_id?: number) => {
        const updatedItem = items.find(item => item.product_id === product_id && (!variation_id || item.variation_id === variation_id));
        if (updatedItem && updatedItem.quantity > 1) {
            dispatch(updateCart({ product_id, variation_id, quantity: updatedItem.quantity - 1 }));
        }
    };

    return (
        <CartTableWrapper>
            <CartTableTable>
                <CartTableHead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Value</th>
                    </tr>
                </CartTableHead>
                <tbody>
                    {orderItems.map((item) => (
                        <tr key={item.id}>
                            <td>+</td>
                            <td>
                                <CartImgWrapper>
                                    <CartItemImg src={item.image.src} alt={item.name} width="50" />
                                </CartImgWrapper>
                            </td>
                            <td>{item.name}</td>
                            <CartTableCell>{item.price}</CartTableCell>
                            <CartTableCell>
                                <QuantityWrapper>
                                    <button onClick={() => handleDecreaseQuantity(item.product_id, item.variation_id)}>-</button>
                                    <QuantityBlock>
                                        {item.quantity}
                                    </QuantityBlock>
                                    <button onClick={() => handleIncreaseQuantity(item.product_id, item.variation_id)}>+</button>
                                </QuantityWrapper>
                            </CartTableCell>
                            <CartTableCell>{item.price * item.quantity}</CartTableCell>
                        </tr>
                    ))}
                </tbody>
            </CartTableTable>
        </CartTableWrapper>
    );
};

export default CartTable;
