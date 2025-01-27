import { CustomCheckboxStyled } from '../CustomCheckbox/styles';
import { CustomCheckboxLabel } from '../CustomFormCheckbox/styles';

export const ConfirmCheckbox = ({ name, label }) => {
  return (
    <CustomCheckboxLabel>
      <CustomCheckboxStyled
        name={name}
        onClick={prev => setIsRegister(!prev)}
      />
      {label}
    </CustomCheckboxLabel>
  );
};
