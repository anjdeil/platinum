import CartTable from "@/components/pages/cart/CartTable/CartTable";
import { Container } from "@/styles/components";
import { FC } from "react";

const Cart: FC= () =>
{
    return (
        <>
            <Container>
            <CartTable></CartTable>
            </Container>
        
     
        </>
    );
}

export default Cart;