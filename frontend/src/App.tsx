import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import FriendsListPage from "./pages/FriendListPage"
import HomePage from "./pages/HomePage"
import LoginCallback from "./pages/LoginCallBack"
import MorePage from "./pages/MorePage"
import MyPage from "./pages/MyPage"
import RankingsPage from "./pages/RankingsPage"
import ReceivedRequestsPage from "./pages/ReceivedRequestPage"
import SearchPage from "./pages/SearchPage"
import UserPage from "./pages/UserPage"

function App() {
  return (
    <>
      <Toaster />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/user/:username" element={<UserPage />} />
      <Route path="/rankings" element={<RankingsPage />} />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="/more" element={<MorePage />} />
      <Route path="/callback" element={<LoginCallback />} />
      <Route path="/requests" element={<ReceivedRequestsPage />} />
      <Route path="/friends" element={<FriendsListPage />} />
    </Routes>
    </>
  )
}

export default App
