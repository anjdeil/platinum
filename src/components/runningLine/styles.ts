import styled, { keyframes } from 'styled-components';

export const scroll = keyframes`
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
`;

export const Wrapper = styled.div`
  overflow: hidden;
  background-color: #113760;
  white-space: nowrap;
  width: auto;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0;
`;

export const Content = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: ${scroll} 15s linear infinite;
  display: flex;
  align-items: center;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  padding-right: 40px;
  gap: 40px;
`;

export const Text = styled.span`
  display: inline-block;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: #F2F8FE;
  display: flex;
  align-items: center;
  gap: 10px;
`;
