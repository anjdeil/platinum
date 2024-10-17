import { StyledIconButton } from "@/styles/components";
import { IconButtonProps } from "@/types/layouts/Buttons";
import Link from "next/link";
import Badge from "../../Badge/Badge";

const IconButton: React.FC<IconButtonProps> = ({
  count = 0,
  color = "#fff",
  IconComponent,
  href,
  onClick,
}) => {
  const ButtonContent = (
    <>
      <Badge count={count} />
      {IconComponent && <IconComponent color={color} />}
    </>
  );

  const IconButtonWrapper = href ? (
    <Link href={href} passHref>
      <StyledIconButton>{ButtonContent}</StyledIconButton>
    </Link>
  ) : (
    <StyledIconButton onClick={onClick}>
      {ButtonContent}
    </StyledIconButton>
  );

  return IconButtonWrapper;
}


export default IconButton;