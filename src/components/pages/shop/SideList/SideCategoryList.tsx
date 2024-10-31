import ForwardArrow from "@/components/global/icons/ForwardArrow/ForwardArrow";
import { SideListPropsType } from "@/types/components/global/sideList";
import { FC } from "react";
import { CategoryChildList, List, SideListContainer, StyledListItem } from "./styles";
import { CategoryChildType } from "@/types/components/shop/categories";

const SideCategoryList: FC<SideListPropsType> = ({
    links,
    onClick,
    marginTop,
    marginBottom,
    rowGap,
    fontSize,
    lineHeight,
    fontWeight,
    borderRadius,
    tabletFontSize,
    mobFontSize,
    mobLineHeight,
    hoverColor,
    hoverBackground,
}) => {

    

    if (!onClick) {
        return <>Error: onClick is not defined</>;
    }

    return (
        <SideListContainer>
            <List
                marginTop={marginTop}
                marginBottom={marginBottom}
                rowGap={rowGap}
            >
                {links?.length ? links.map((
                    { name, url, isNested, children, isActive }) => 
                        (<StyledListItem
                        key={name}
                        fontSize={fontSize}
                        lineHeight={lineHeight}
                        fontWeight={fontWeight}
                        borderRadius={borderRadius}
                        tabletFontSize={tabletFontSize}
                        mobFontSize={mobFontSize}
                        mobLineHeight={mobLineHeight}
                        hoverColor={hoverColor}
                        hoverBackground={hoverBackground}
                        isActive={isActive}
                    >
                        {isNested ? (
                            <>
                                <button onClick={() => onClick(url, '')} >
                                    <ForwardArrow  />
                                    <span>{name}</span>
                                </button>
                                <CategoryChildList className="child-list">
                                    {children?.map((child: CategoryChildType) => (
                                        <StyledListItem 
                                            key={child.name}
                                            fontSize={fontSize}
                                            lineHeight={lineHeight}
                                            fontWeight={fontWeight}
                                            borderRadius={borderRadius}
                                            tabletFontSize={tabletFontSize}
                                            mobFontSize={mobFontSize}
                                            mobLineHeight={mobLineHeight}
                                            isActive={child.isActive}
                                        >
                                            <button 
                                            onClick={() => onClick(url, child.slug)}>
                                                {child.name}
                                            </button>
                                        </StyledListItem>
                                    ))}
                                </CategoryChildList>
                            </>
                        ) : (
                            <button onClick={() => onClick(url, '')}>
                                <span>{name}</span>
                            </button>
                        )}
                    </StyledListItem>
                )) : null}
            </List>
        </SideListContainer>
    );
}

export default SideCategoryList;
