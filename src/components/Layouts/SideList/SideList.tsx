import ForwardArrow from "@/components/Common/Icons/ForwardArrow/ForwardArrow";
import { SideListPropsType } from "@/types/Layouts/SideList";
import Link from "next/link";
import { FC } from "react";
import { Button, List, SideListContainer } from "./styles";

const SideList: FC<SideListPropsType> = ({ links, onClick }) => {
    return (
        <SideListContainer>
            <List>
                {Boolean(links?.length) && links.map(({ name, url, isNested }) => (
                    <li key={name}>                       
                        {onClick !== undefined ?
                            (
                                <Button
                                    onClick={() => onClick(url)}
                                >
                                    {isNested && (
                                        <ForwardArrow />
                                    )}
                                    <span>{name}</span>
                                </Button>
                            )
                             :
                            <Link
                                href={url}
                            >
                                <span>{name}</span>
                            </Link>
                        }
                        
                    </li>
                ))}
            </List>
        </SideListContainer>
    );
}

export default SideList;