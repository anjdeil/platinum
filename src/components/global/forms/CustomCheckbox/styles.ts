import { Checkbox } from "@mui/material";
import styled from "@emotion/styled";

export const CustomCheckboxStyled = styled(Checkbox)(({ theme }) => ({
    color: theme.colors.primary,
    '&.Mui-checked': {
        color: theme.colors.primary,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 30,
    },
}));