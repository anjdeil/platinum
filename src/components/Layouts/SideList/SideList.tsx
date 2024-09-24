import { SideListPropsType } from "@/types/Layouts/SideList";
import { FC } from "react";
import { Button, List, SideListContainer } from "./styles";

const SideList: FC<SideListPropsType> = ({ links, onClick }) => {
    return (
         <SideListContainer>
            <List>
                {Boolean(links?.length) && links.map(({ name, url }) => (
                    <li key={name}>
                        <Button
                            onClick={() => onClick(url)}
                        >
                            <span>{name}</span>
                        </Button>
                    </li>
                ))}
            </List>
        </SideListContainer>
    );
}

export default SideList;