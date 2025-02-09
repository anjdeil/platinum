import { FC, ReactNode } from 'react';
import { NotificationWrapper } from './styles';

interface NotificationPropsType {
  children: ReactNode;
  type?: 'success' | 'warning' | 'info';
  marginBottom?: string;
  marginTop?: string;
}

const Notification: FC<NotificationPropsType> = ({
  children,
  type,
  marginBottom,
  marginTop,
}) => {
  return (
    <NotificationWrapper
      marginTop={marginTop}
      marginBottom={marginBottom}
      type={type}
    >
      {children}
    </NotificationWrapper>
  );
};

export default Notification;
