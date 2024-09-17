import styled from "@emotion/styled";

interface StarProps {
  filled: boolean;
}

const Star = styled.svg<StarProps>`
  width: 20px;
  height: 20px;
  fill: ${({ filled, theme }) => (filled ? theme.colors.primary : "white")};
  stroke: #113760;
`;

const StarsWrapper = styled.div`
  display: flex;
  gap: 1px;
`;

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const totalStars = 5;

  return (
    <StarsWrapper>
      {Array.from({ length: totalStars }, (_, index) => (
        <Star
          key={index}
          filled={index < rating}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <g clipPath="url(#clip0)">
            <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" />
            <g clipPath="url(#clip1)">
              <path
                d="M10 1.80198L12.0661 6.76946C12.2101 7.11569 12.5357 7.35226 12.9095 7.38223L18.2723 7.81216L14.1864 11.3122C13.9016 11.5561 13.7773 11.9389 13.8643 12.3037L15.1126 17.5368L10.5213 14.7325C10.2012 14.537 9.79876 14.537 9.47874 14.7325L4.88743 17.5368L6.13574 12.3037C6.22275 11.9389 6.09838 11.5561 5.81359 11.3122L1.72769 7.81216L7.0905 7.38223C7.46429 7.35226 7.7899 7.11569 7.93391 6.76946L10 1.80198Z"
                stroke="#113760"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="20" height="20" fill="white" />
            </clipPath>
            <clipPath id="clip1">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </Star>
      ))}
    </StarsWrapper>
  );
};

export default Rating;