import { RatingProps } from "@/types/components/global/rating";
import StarIcon from "../icons/StarIcon/StarIcon";
import { StarsWrapper } from "./styles";

const Rating: React.FC<RatingProps> = ({ rating }) =>
{
  const totalStars = 5;

  return (
    <StarsWrapper>
      {Array.from({ length: totalStars }, (_, index) => (
        <StarIcon
          key={index}
          filled={index < rating}
        />        
      ))}
    </StarsWrapper>
  );
};

export default Rating;