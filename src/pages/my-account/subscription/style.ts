import styled from '@emotion/styled';
import { Switch } from '@mui/material';

export const SubscriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin-bottom: 80px;
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
