import styled from "@emotion/styled";

export const Home = () => {
  return (
    <Container className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="text-lg">This is a simple React application.</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  `;

export default Home;