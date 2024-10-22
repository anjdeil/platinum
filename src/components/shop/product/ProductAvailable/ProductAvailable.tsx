import { AvailableStyles, EmptyStyled } from "./styles";

const ProductAvailable = ({ count = 0 }) =>
{
    return (
        <>
            {count > 0 ? (
                <AvailableStyles>
                    {`Available: ${count} pcs`}
                </AvailableStyles >
            ) : (
                <EmptyStyled>
                    {`Not available`}
                </EmptyStyled >
            )}
            
        </>
    );
};

export default ProductAvailable;