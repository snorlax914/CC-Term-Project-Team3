import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../features/Header';
import Home from '../pages/Home';
import MyPage from '../pages/Mypage';
import Rank from '../pages/Rank';
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/rank" element={ <Rank />} />
      </Routes>
    </BrowserRouter>
  );
};
