import { InputProps } from "@/types/layouts/Input";
import { useState } from "react";
import EyeIcon from "../Icons/EyeIcon/EyeIcon";
import EyeOffIcon from "../Icons/EyeOffIcon/EyeOffIcon";
import { StyledButtonEye, StyledErrorText, StyledInput, StyledInputBlock, StyledInputWrapper, StyledLabel, StyledTextarea } from "./styles";

const CustomInput: React.FC<InputProps> = ({ name, type="text", errorText, label, placeholder='', required=false }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    return (
        <StyledInputWrapper>
            {label && <StyledLabel htmlFor={name}>{label} {required ? '*' : ''}</StyledLabel>}
            {type === "description" ? (
                <StyledTextarea id={name} name={name} placeholder={placeholder} required={required} />
            ) : (
                <StyledInputBlock>
                    <StyledInput
                        id={name}
                        name={name}
                        type={type === "password" && !showPassword ? "password" : type === "password" && showPassword ? "text" : type}
                        required={required}
                        placeholder={placeholder}
                    />
                    {type === "password" && (
                        <StyledButtonEye
                            type="button"
                            onClick={handlePasswordToggle}
                        >
                            {!showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </StyledButtonEye>
                    )}
                </StyledInputBlock>
            )}
            {errorText && <StyledErrorText>{errorText}</StyledErrorText>}
        </StyledInputWrapper>
    );
}

export default CustomInput
