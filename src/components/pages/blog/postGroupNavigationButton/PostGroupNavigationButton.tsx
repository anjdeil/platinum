import { useTranslations } from 'next-intl';
import { StyledButton, StyledButtonsGroup, StyledIcon } from './styled';

type PostGroupNavigationButtonProps = {
  prev_post?: string;
  next_post?: string;
};

export const PostGroupNavigationButton: React.FC<
  PostGroupNavigationButtonProps
> = ({ prev_post, next_post }) => {
  const t = useTranslations('BlogPostPage');

  return (
    <StyledButtonsGroup isOnlyNextButton={!prev_post}>
      {prev_post && (
        <StyledButton href={`/blog/${prev_post}`}>
          <StyledIcon
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.08198 12.858L7.02098 13.918L1.24198 8.14103C1.14882 8.04846 1.0749 7.93838 1.02445 7.81713C0.974 7.69588 0.948029 7.56585 0.948029 7.43453C0.948029 7.3032 0.974 7.17317 1.02445 7.05192C1.0749 6.93067 1.14882 6.8206 1.24198 6.72803L7.02098 0.948029L8.08098 2.00803L2.65698 7.43303L8.08198 12.858Z"
              fill="currentColor"
            />
          </StyledIcon>
          {t('previousPost')}
        </StyledButton>
      )}
      {next_post && (
        <StyledButton href={`/blog/${next_post}`}>
          {t('nextPost')}
          <StyledIcon
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.918021 1.14197L1.97902 0.0819721L7.75802 5.85897C7.85118 5.95154 7.9251 6.06162 7.97555 6.18287C8.026 6.30412 8.05197 6.43415 8.05197 6.56547C8.05197 6.6968 8.026 6.82683 7.97555 6.94808C7.9251 7.06933 7.85118 7.1794 7.75802 7.27197L1.97902 13.052L0.919021 11.992L6.34302 6.56697L0.918021 1.14197Z"
              fill="currentColor"
            />
          </StyledIcon>
        </StyledButton>
      )}
    </StyledButtonsGroup>
  );
};
