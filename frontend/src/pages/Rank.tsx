/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { colors } from '../types/colors';

const TableWrapper = styled.div`
  width: 100%;
  border-collapse: collapse;
  font-family: sans-serif;
  padding: 20px;
  box-sizing: border-box;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr repeat(6, 80px);
  background-color: #ccc;
  font-weight: bold;
  padding: 12px;
`;

const TableRow = styled.div<{ highlight?: boolean }>`
  display: grid;
  grid-template-columns: 60px 1fr repeat(6, 80px);
  background-color: ${colors.black.dark};
  padding: 12px;
  border: ${({ highlight }) => (highlight ? `2px solid ${colors.gray.dark}` : `2px solid ${colors.gray.dark}`)};
  margin-top: 4px;
`;

const TableCell = styled.div`
  padding: 8px;
  text-align: center;
  font-size: 14px;
  color: ${colors.text.white}; 
`;

const LinkCell = styled(TableCell)`
  text-decoration: underline;
  color: blue;
  cursor: pointer;
`;

export const Rank = () => {
  return (
    <TableWrapper>
      <TableHeader>
        <TableCell>Rank</TableCell>
        <TableCell>이름</TableCell>
        <TableCell>Star</TableCell>
        <TableCell>Commits</TableCell>
        <TableCell>PRs</TableCell>
        <TableCell>Issue</TableCell>
        <TableCell>Contribute</TableCell>
        <LinkCell>Total</LinkCell>
      </TableHeader>

      <TableRow highlight>
        <TableCell>1</TableCell>
        <TableCell>minkyeong</TableCell>
        <TableCell>0</TableCell>
        <TableCell>130</TableCell>
        <TableCell>24</TableCell>
        <TableCell>10</TableCell>
        <TableCell>3</TableCell>
        <TableCell>1024</TableCell>
      </TableRow>

      <TableRow>
        <TableCell>2</TableCell>
        <TableCell>minkyeong</TableCell>
        <TableCell>0</TableCell>
        <TableCell>130</TableCell>
        <TableCell>24</TableCell>
        <TableCell>10</TableCell>
        <TableCell>3</TableCell>
        <TableCell>1024</TableCell>
      </TableRow>

      <TableRow>
        <TableCell>3</TableCell>
        <TableCell>minkyeong</TableCell>
        <TableCell>0</TableCell>
        <TableCell>130</TableCell>
        <TableCell>24</TableCell>
        <TableCell>10</TableCell>
        <TableCell>3</TableCell>
        <TableCell>1024</TableCell>
      </TableRow>
    </TableWrapper>
  );
};

export default Rank;
