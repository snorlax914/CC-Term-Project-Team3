import styled from "@emotion/styled";
import { colors } from "../types/colors";

export const Home = () => {
  return (
    <Container className="flex flex-col items-center justify-center h-screen">
      <Content>
        <ContentText>
            GitRank는 개발자들이 자신의 GitHub 활동을 시각화하고, 
        </ContentText>
        <ContentText>
            친구들과의 개발 열정을 비교하며 서로 동기부여할 수 있는 플랫폼입니다.
        </ContentText>
        <ContentText>
            커밋, PR, 스타 등 GitHub의 다양한 기여 지표를 기반으로 순위를 매기고, 
        </ContentText>
        <ContentText>
            한눈에 자신의 개발 활동을 추적할 수 있습니다.
        </ContentText>
        <ButtonStyle>
          <div className="btn-cells">
            {[...Array(50)].map((_, i) => (
              <span key={i}></span>
            ))}
          </div>
          <div className="btn-content">Github로 로그인</div>
        </ButtonStyle>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding: 28px;
  box-sizing: border-box;
  `;
  
  const Content = styled.div`
  display: flex;
  border-radius: 8px;
  border: 2px solid ${colors.gray.dark};
  background-color: ${colors.black.dark};
  padding: 50px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  `;

const ContentText = styled.div`
  font-size: 18px;
  color: ${colors.text.white};
  text-align: center;
`;

const ButtonStyle = styled.button`
  position: relative;
  background-color: ${colors.gray.dark};
  color: ${colors.text.white};
  border: none;
  border-radius: 60px;
  padding: 20px 40px;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 40px;
  .btn-content {
    position: relative;
    z-index: 2;
    pointer-events: none;
  }

  .btn-cells {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-auto-rows: 1fr;

    span {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        width: 40px;
        height: 40px;
        border-radius: 999px;
        background: ${colors.primary || '#51f0ed'};
        background-image: linear-gradient(
          to right,
          ${colors.primary || '#51f0ed'},
          color-mix(in srgb, ${colors.primary || '#51f0ed'}, white 50%)
        );
        transform: scale(0);
        transition: transform 0.4s ease;
        pointer-events: none;
      }

      &:hover::before {
        transform: scale(10);
      }
    }
  }
`;

export default Home;