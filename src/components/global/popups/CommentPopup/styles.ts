import styled from "@emotion/styled";

export const PopupOverlay = styled.div`
	position: fixed;
	z-index: 1000;
	background-color: rgba(0, 0, 0, 0.4);
	inset: 0;
`;

export const PopupBody = styled.div`
  box-sizing: border-box;
  max-width: 791px;
  width: 90%;
  height: auto;
  padding: 64px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.media.large} {
    // max-width: 622px;
    // padding: 72px 80px;
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 90%;
    padding: 20px;
  }
`;

export const CloseWrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 24px;
  right: 24px;

  @media ${({ theme }) => theme.media.medium} {
    top: 28px;
    right: 28px;
  }
`;

export const FormWrapper = styled.div`
  border-radius: 8px;
  padding: 32px;
  border: ${({ theme }) => `1px solid ${theme.colors.lightBorder}`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  // row-gap: 24px;
`;

export const TextFieldsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  column-gap: 8px;

  @media only screen and (max-width: 650px) {
    flex-direction: column;
    row-gap: 8px;
  }
`;

export const StyledName = styled.span`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-transform: uppercase;
`;

export const StyledRatingWrapper = styled.div`
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 24px;

  & textarea {
    width: 100%;
    min-height: 87px;
    padding: 12px 16px;
    border-radius: 8px;
    border: none;
    background-color: ${({ theme }) => theme.background.secondary};
    resize: none;
  }
`;