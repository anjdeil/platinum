import { FC, ReactNode } from 'react';
import { NotificationWrapper } from './styles';

interface NotificationPropsType {
  children: ReactNode;
  type?: 'success' | 'warning' | 'info';
  marginBottom?: string;
  isVisible?: boolean;
}

const Notification: FC<NotificationPropsType> = ({
  children,
  type,
  marginBottom,
  isVisible,
}) => {
  return (
    <NotificationWrapper
      marginBottom={marginBottom}
      type={type}
      className={!isVisible ? 'fade-out' : ''}
    >
      {children}
    </NotificationWrapper>
  );
};

export default Notification;
