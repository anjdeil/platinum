import ForwardArrow from "@/components/global/icons/ForwardArrow/ForwardArrow";
import { SideListPropsType } from "@/types/global/SideList";
import Link from "next/link";
import { FC } from "react";
import { List, SideListContainer, StyledListItem } from "./styles";

const SideList: FC<SideListPropsType> = ({
    links,
    activeLink,
    onClick,
    marginTop,
    marginBottom,
    rowGap,
    fontSize,
    lineHeight,
    fontWeight,
    borderRadius,
    tabletFontSize,
    tabletLineHeight,
    mobFontSize,
    mobLineHeight,
    hoverColor,
    hoverBackground,
}) => {
    return (
        <SideListContainer>
            <List
                marginTop={marginTop}
                marginBottom={marginBottom}
                rowGap={rowGap}
            >
                {Boolean(links?.length) && links.map(({ name, url, isNested }) => (
                    <StyledListItem
                        key={name}
                        fontSize={fontSize}
                        lineHeight={lineHeight}
                        fontWeight={fontWeight}
                        borderRadius={borderRadius}
                        tabletFontSize={tabletFontSize}
                        tabletLineHeight={tabletLineHeight}
                        mobFontSize={mobFontSize}
                        mobLineHeight={mobLineHeight}
                        hoverColor={hoverColor}
                        hoverBackground={hoverBackground}
                        isActive={url === activeLink}
                    >                       
                        {onClick !== undefined ?
                            (
                                <button
                                    onClick={() => onClick(url)}
                                >
                                    {isNested && (
                                        <ForwardArrow />
                                    )}
                                    <span>{name}</span>
                                </button>
                            )
                             :
                            <Link
                                href={url}
                            >
                                <span>{name}</span>
                            </Link>
                        }

                    </StyledListItem>
                ))}
            </List>
        </SideListContainer>
    );
}

export default SideList;