import LoginLoadingScreen from "@/features/LoginLoading";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

const LoginCallback = () => {
  const { setAuth } = useAuthStore();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const returnedState = params.get("state");
    const originalState = localStorage.getItem("oauth_state");

    if (!code || !returnedState || returnedState !== originalState) {
      alert("잘못된 인증 요청입니다.");
      return;
    }

    fetch(`http://3.107.76.196/api/auth/callback/github?code=${code}&state=${returnedState}`)
      .then((res) => res.json())
      .then(({ access_token, user }) => {
        localStorage.setItem("access_token", access_token);
        setAuth(access_token, user);
        window.location.href = "/";
      })
      .catch((err) => {
        console.error("OAuth 처리 실패", err);
        alert("로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
        localStorage.removeItem("oauth_state");
        window.location.href = "/";
      });
  }, []);

  return (
    <div>
      <LoginLoadingScreen isLoading={true} />
    </div>
  );
};

export default LoginCallback;
