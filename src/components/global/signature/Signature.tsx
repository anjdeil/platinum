import {
  StyledSignatureLink,
  StyledSignatureText,
  StyledSignaure,
} from './styles';

const Signature = () => {
  return (
    <StyledSignaure>
      <StyledSignatureText>
        Developed by{' '}
        <StyledSignatureLink href="https://www.digiway.dev/" target="_blank">
          DIGIway
        </StyledSignatureLink>{' '}
        media with ♥.
      </StyledSignatureText>
    </StyledSignaure>
  );
};

export default Signature;
