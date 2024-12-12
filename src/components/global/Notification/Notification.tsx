import { FC, ReactNode } from 'react'
import { NotificationWrapper } from './styles'

interface NotificationPropsType {
  children: ReactNode
  type?: 'success' | 'warning' | 'info' | 'warningSecondary'
}

const Notification: FC<NotificationPropsType> = ({ children, type }) => {
  return <NotificationWrapper type={type}>{children}</NotificationWrapper>
}

export default Notification
