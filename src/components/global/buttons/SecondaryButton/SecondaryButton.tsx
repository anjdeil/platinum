import { FC } from "react";
import { z } from "zod";
import { StyledSecondaryButton } from './styles';

const PrimaryButtonPropsSchema = z.object({
    children: z.string().optional(),
    buttonType: z.union([z.literal('button'), z.literal('reset'), z.literal('submit')]),
    isDisabled: z.boolean().optional(),
    onClick: z.function()
        .args(z.any())
        .returns(z.void())
        .optional(),
});

type PrimaryButtonProps = z.infer<typeof PrimaryButtonPropsSchema>;

export const SecondaryButton: FC<PrimaryButtonProps> = ({ children, buttonType, isDisabled, onClick }) => {

    return (
        <StyledSecondaryButton
            type={buttonType}
            disabled={isDisabled}
            onClick={onClick}
        >
            {children}
        </StyledSecondaryButton>
    );
};
