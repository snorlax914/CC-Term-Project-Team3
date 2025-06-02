import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import UserPage from "./pages/UserPage"
import RankingsPage from "./pages/RankingsPage"
import MyPage from "./pages/MyPage"
import MorePage from "./pages/MorePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/user/:username" element={<UserPage />} />
      <Route path="/rankings" element={<RankingsPage />} />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="/more" element={<MorePage />} />
    </Routes>
  )
}

export default App
