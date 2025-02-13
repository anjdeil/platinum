import styled from '@emotion/styled';
import { NotificationWrapper } from '@/components/global/Notification/styles';


export const FreeShippingNotification = styled(NotificationWrapper)<{
  type?: 'success' | 'warning' | 'info';
  isVisible: boolean;
  marginBottom?: string;
}>`
    display: flex;
    justify-content: stretch;
    @media ${({ theme }) => theme.media.large} {
        font-size: 14px;
    }
`;

export const FreeShippingNotificationInfo = styled.div``;

export const FreeShippingNotificationMethods = styled.p`
    color: ${({ theme }) => theme.colors.grey};
    font-size: 0.9em;
    margin-top: 0.2em;
`;
