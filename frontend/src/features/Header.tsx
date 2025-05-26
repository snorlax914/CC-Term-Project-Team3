import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { colors } from "../types/colors";

export const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <HeaderLeft>
        <HeaderLogo src={Logo} alt="GitRank Logo" />
        <HeaderText>GitRank</HeaderText>
        </HeaderLeft>
      </Link>
      <HeaderRight>
        <MenuItem>검색</MenuItem>
        <Link to="/rank">
          <MenuItem>랭킹</MenuItem>
        </Link>
        <Link to="/mypage">
          <MenuItem>마이페이지</MenuItem>
        </Link>
        </HeaderRight>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  drop-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
  padding: 20px 20px; 
`;

const HeaderText = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: #FFF;
  align-self: center;
  margin-top: 6px;
`;

const HeaderLogo = styled.img`
  height: 48px;
  width: 48px;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  align-items: center;
  `;
  
  const MenuItem = styled.div`
  position: relative;
  font-size: 16px;
  color: #FFF;
  cursor: pointer;
  padding: 8px 16px;
  border: 1px solid transparent;
  transition: color 0.2s ease;
  text-decoration: none;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid ${colors.primary};
    border-radius: 4px;
    z-index: 0;
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  &:hover {
    color: ${colors.primary};
  }

  &:hover::before {
    opacity: 1;
    transform: scale(1);
  }

  z-index: 1;
  background-color: transparent;
`;

