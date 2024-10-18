import Link from "next/link";
import { useMemo } from "react";
import { StyledIconButton } from "./styles";
import { IconButtonProps } from "@/types/components/global/buttons/iconButton";
import Badge from "@/components/global/buttons/Badge/Badge";

const IconButton: React.FC<IconButtonProps> = ({
  count = 0,
  color = "#fff",
  IconComponent,
  href,
  onClick,
}) =>
{
  const ButtonContent = useMemo(() =>
  {
    return (
      <>
        <Badge count={count} />
        {IconComponent && <IconComponent color={color} />}
      </>
    );
  }, [count, color, IconComponent]);

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