import { RatingProps } from "@/types/components/global/rating";
import StarIcon from "../icons/StarIcon/StarIcon";
import { StarButton, StarsWrapper } from "./styles";

const Rating: React.FC<RatingProps> = ({ rating, onChange, width, height }) => {
  const totalStars = 5;

  const handleRatingChange = (newRating: number) => {
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <StarsWrapper>
      {Array.from({ length: totalStars }, (_, index) => (
        <StarButton
          key={index}
          onClick={() => handleRatingChange(index + 1)}
          style={{ cursor: onChange ? 'pointer' : 'default' }}
        >
          <StarIcon filled={index < rating} width={width} height={height} />
        </StarButton>
      ))}
    </StarsWrapper>
  );
};

export default Rating;