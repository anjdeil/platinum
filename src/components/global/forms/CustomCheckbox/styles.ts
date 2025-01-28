import { Checkbox } from "@mui/material";
import styled from "@emotion/styled";

export const CustomCheckboxStyled = styled(Checkbox)(({ theme }) => ({
  padding: '9px 9px 9px 0',
  color: theme.colors.primary,
  '&.Mui-checked': {
    color: theme.colors.primary,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 30,
  },
}));