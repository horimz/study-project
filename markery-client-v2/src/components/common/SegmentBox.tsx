import React from "react";
import styled from "styled-components";
import { boxShadow } from "../../lib/styles";

const StyledSegmentBox = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  position: relative;
  ${boxShadow.segmentBox}
`;

interface SegmentBoxProps {}

const SegmentBox: React.FC<SegmentBoxProps> = ({ children }) => {
  return <StyledSegmentBox>{children}</StyledSegmentBox>;
};

export { SegmentBox };
