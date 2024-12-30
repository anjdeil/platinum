import { FC, ReactNode } from 'react';
import { NotificationWrapper } from './styles';

interface NotificationPropsType {
  children: ReactNode;
  type?: 'success' | 'warning' | 'info';
  show?: boolean;
}

const Notification: FC<NotificationPropsType> = ({ children, type, show }) => {
  return (
    <NotificationWrapper show={show} type={type}>
      {children}
    </NotificationWrapper>
  );
};

export default Notification;
