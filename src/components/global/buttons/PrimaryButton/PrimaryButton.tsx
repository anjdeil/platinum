import { Button } from "@mui/material";
import { FC } from "react";
import { z } from "zod";
import { StyledPrimaryButton } from './styles';

const PrimaryButtonPropsSchema = z.object({
    children: z.string(),
    buttonType: z.union([z.literal('button'), z.literal('reset'), z.literal('submit')]),
    isDisabled: z.boolean().optional(),
});

type PrimaryButtonProps = z.infer<typeof PrimaryButtonPropsSchema>;

export const PrimaryButton: FC<PrimaryButtonProps> = ({ children, buttonType, isDisabled }) => {
    return (
        <StyledPrimaryButton
            type={buttonType}
            disabled={isDisabled}
        >
            {children}
        </StyledPrimaryButton>
    );
};
