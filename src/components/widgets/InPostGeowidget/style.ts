import styled from '@emotion/styled'

export const InPostGeowidgetWindowWrapper = styled.div`
    inset: 0;
    position: fixed;
    z-index: 100;
    background-color: rgba(0,0,0,0);
    transition: .5s ease;
    &.active {
        background-color: rgba(0,0,0,.8);
    }
`;

export const InPostGeowidgetWindow = styled.div`
    inset: 30px;
    position: absolute;
    border-radius: 30px;
    overflow: hidden;
    transition: .5s ease;
    transform: scale(0);
    opacity: 0;
    &.active {
        opacity: 1;
        transform: scale(1);
    }
`;

export const InPostGeowidgetCloseButton = styled.div`
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,.6);
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 0.8em 1.5em;
    transition: .2s ease;
    border-radius: 30px;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    padding-left: 0.8em;
    &:hover {
        background: rgba(0,0,0,1);
    }
    @media (max-width: 900px) {
        top: auto;
        bottom: 20px;
    }
`;