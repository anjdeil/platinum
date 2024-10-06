import { SkeletonSpan, StyledActionsTd, StyledBody, StyledBodyTr, StyledDateTd, StyledDetailesTd, StyledTd } from "./styles";

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
            <SkeletonSpan style={{ width: "80px", height: "32px" }} />
            <SkeletonSpan style={{ width: "24px", height: "24px" }} />
          </StyledActionsTd>
        </StyledBodyTr>
      ))}
    </StyledBody>
  )
};