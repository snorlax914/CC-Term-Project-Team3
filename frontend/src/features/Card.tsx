import styled from "@emotion/styled";
import { colors } from "../types/colors";

interface CardProps {
  width?: number | string;
  children?: React.ReactNode;
};

export const Card = ({width, children}: CardProps) => {
  return (
    <CardContainer width={width}>
      {children}
    </CardContainer>
  );
}

const CardContainer = styled.div<CardProps>`
  width: ${(props) => props.width || '300px'};
  padding: 20px;
  height: 200px;
  background-color: ${colors.black.dark};
  border-radius: 10px;
  border: 2px solid ${colors.gray.dark};
  box-sizing: border-box;
`;

export default Card;
