import { FC } from "react";
import styled from "styled-components";

const SideListContainer = styled.nav`
    width: 100%;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 32px;
    margin-bottom: 106px;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
`;

const Button = styled.button`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
    font-size: 12px;
    line-height: 16px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    transition: all 0.2s ease;
    border: none;
    width: 100%;
    cursor: pointer;
    text-transform: uppercase;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
    }
`;

export type SideListLinkType = {
    name: string,
    slug: string,
};

interface SideListPropsType {
    links: SideListLinkType[],
    onClick: (slug: string) => void,
}

const SideList: FC<SideListPropsType> = ({ links, onClick }) => {

    return (
         <SideListContainer>
            <List>
                {Boolean(links?.length) && links.map(({ name, slug }) => (
                    <li key={name}>                       
                        <Button
                            onClick={() => onClick(slug)}
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