import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import WhatsAppIcon from '../../icons/socials/WhatsAppIcon/WhatsAppIcon';
import { StyledButtonLink, StyledIconContainer } from './styles';
import { useTranslations } from 'next-intl';
import theme from '@/styles/theme';

export default function WhatsAppButton() {
  const t = useTranslations('Contacts');

  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 210,
      height: 60,
      fontFamily: theme.typography.fontFamily,
      fontSize: 14,
      fontWeight: 500,
      padding: '0 20px',
      borderRadius: 30,
      backgroundColor: 'white',
      color: '#000',
      boxShadow: '0 0 6px 0 rgba(17, 55, 96, .2)',

      '@media screen and (max-width: 768px)': {
        height: 55,
      },
    },
  });

  return (
    <CustomWidthTooltip title={t('whatsApp')} placement="left">
      <StyledButtonLink href="https://wa.me/48883462736" target="_blank">
        <StyledIconContainer>
          <WhatsAppIcon width={35} height={35} fill="#fff" />
        </StyledIconContainer>
      </StyledButtonLink>
    </CustomWidthTooltip>
  );
}
