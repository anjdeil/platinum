import { Switch } from '@mui/material';
import styled from '@emotion/styled';
export const SubscriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 15px;
  margin-bottom: 80px;

  @media ${({ theme }) => theme.media.medium} {
    margin-top: 30px;
  }
`;

export const SubscriptionCardWrapper = styled.div`
  border-radius: 8px;
  display: flex;
  align-items: start;
  gap: 16px;
  padding: 24px 16px;
  background-color: ${({ theme }) => theme.background.secondary};
`;
export const SubscribeText = styled.p`
  font: ${({ theme }) => theme.fonts.titleH2SemiBold};
`;
export const SubscribeDescText = styled.p`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
`;

export const CustomSwitch = styled(Switch)(() => ({
  width: 60,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#113760',
        opacity: '1',
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#1976d2',
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#fff',
  },
  '& .MuiSwitch-track': {
    width: '50px',
    height: '25px',
    borderRadius: '15px',
    backgroundColor: '#E0EFFE',
    opacity: '1',
  },
}));
