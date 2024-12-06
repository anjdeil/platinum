import { CloseButton } from './styles'

interface CloseProps {
  onClick: () => void
}

const TrashIcon = ({ onClick }: CloseProps) => (
  <CloseButton onClick={onClick} aria-label="delete product">
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.1875 9.08594H10.3125V18.0859H9.1875V9.08594Z" fill="#738EBC" />
      <path d="M11.4375 9.08594H12.5625V18.0859H11.4375V9.08594Z" fill="#738EBC" />
      <path d="M13.6875 9.08594H14.8125V18.0859H13.6875V9.08594Z" fill="#738EBC" />
      <path d="M4.6875 5.71094H19.3125V6.83594H4.6875V5.71094Z" fill="#738EBC" />
      <path
        d="M14.7746 6.275H13.7246V5.15C13.7246 4.8125 13.4621 4.55 13.1246 4.55H10.8746C10.5371 4.55 10.2746 4.8125 10.2746 5.15V6.275H9.22461V5.15C9.22461 4.25 9.97461 3.5 10.8746 3.5H13.1246C14.0246 3.5 14.7746 4.25 14.7746 5.15V6.275Z"
        fill="#738EBC"
      />
      <path
        d="M15.375 21.4633H8.625C7.725 21.4633 6.9375 20.7133 6.8625 19.8133L5.8125 6.31328L6.9375 6.23828L7.9875 19.7383C8.025 20.0758 8.325 20.3383 8.625 20.3383H15.375C15.7125 20.3383 16.0125 20.0383 16.0125 19.7383L17.0625 6.23828L18.1875 6.31328L17.1375 19.8133C17.0625 20.7508 16.275 21.4633 15.375 21.4633Z"
        fill="#738EBC"
      />
    </svg>
  </CloseButton>
)

export default TrashIcon
