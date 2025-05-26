import styled from "@emotion/styled";
import Card from "../features/Card";
import { colors } from "../types/colors";

export const MyPage = () => {
  return (
    <Container>
      <Card width="100%">
        <Content>
        <h2>내 GitHub 정보</h2>
        <p>사용자 이름: 홍길동</p>
        <p>GitHub ID: honggildong</p>
        <p>총 커밋 수: 1234</p>
        <p>총 PR 수: 56</p>
        <p>총 스타 수: 789</p>
        </Content>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  `;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.text.white};
  `;

export default MyPage;