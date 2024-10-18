import { SkeletonButton, SkeletonIcon, SkeletonSpan, StyledActionsTd, StyledBody, StyledBodyTr, StyledDateTd, StyledDetailesTd, StyledTd } from "./styles";

export const SkeletonOrderTable = () => { 
  return (    
    <StyledBody>
      {[...Array(3)].map((_, index) => (
        <StyledBodyTr key={index}>
          <StyledTd><SkeletonSpan /></StyledTd>
          <StyledDetailesTd>
            <SkeletonSpan />
            <SkeletonSpan />
            <SkeletonSpan />
          </StyledDetailesTd>
          <StyledDateTd><SkeletonSpan /></StyledDateTd>
          <StyledTd><SkeletonSpan /></StyledTd>
          <StyledActionsTd>
            <SkeletonButton />
            <SkeletonIcon />
          </StyledActionsTd>
        </StyledBodyTr>
      ))}
    </StyledBody>
  )
};