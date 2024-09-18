import { popupSet } from '@/store/slices/PopupSlice';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Button = styled.button`
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.background.secondary};
    width: 100%;
    text-transform: none;
    font-size: 1rem;
    line-height: 24px;
    font-weight: 400;
    justify-content: space-between;
    border-radius: 10px;
    padding: 8px 16px;
    color: ${({ theme }) => theme.colors.grey};
    display: flex;
    align-items: center;
    border: none;
    cursor: pointer;
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    }
`;

const Icon = styled(Image)`
    margin-left: auto;
`;

const MobileSearchButton: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <Button onClick={() => dispatch(popupSet('mobile-search'))}>
            Search
            <Icon
                src={'/assets/icons/search.svg'}
                alt={'Search'}
                width={24}
                height={24}
                unoptimized={true}
            />
        </Button>
    );
};

export default MobileSearchButton;
