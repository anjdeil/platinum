import { FC, ReactNode } from 'react';
import { NotificationWrapper } from './styles';

interface NotificationPropsType {
  children: ReactNode;
  type?: 'success' | 'warning' | 'info';
  marginBottom?: string;
}

const Notification: FC<NotificationPropsType> = ({
  children,
  type,
  marginBottom,
}) => {
  return (
    <NotificationWrapper marginBottom={marginBottom} type={type}>
      {children}
    </NotificationWrapper>
  );
};

export default Notification;
