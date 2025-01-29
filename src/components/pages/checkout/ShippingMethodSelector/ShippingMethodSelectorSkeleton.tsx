import { SkeletonContainer, SkeletonElement } from "@/components/menus/MenuSkeleton/styles";
import theme from "@/styles/theme";

export default function ShippingMethodSelectorSkeleton({ count = 3 }) {
    return (
        <SkeletonContainer gap="10px" direction="column">
            {Array.from(Array(count)).map((_, index) => (
                <SkeletonElement
                    key={index}
                    width="100%"
                    height="85px"
                    color={theme.background.skeletonSecondary}
                />
            ))}
        </SkeletonContainer>
    )
}