import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/logo/thejulge.svg";

import Alert from "@/components/Alert/Alert";
import SearchInput from "@/components/SearchInput";
import { useUserStore } from "@/hooks/useUserStore";

export default function Header() {
  const navigate = useNavigate();
  const { user, isLoggedIn, clearUser } = useUserStore();

  const userNavLabel = user?.type === "employer" ? "내 가게" : "내 프로필";
  const userPath = user?.type === "employer" ? "/shop" : "/profile";

  const handleLogout = () => {
    navigate("/");
    setTimeout(() => clearUser(), 100);
  };

  return (
    <header className="w-full px-4 py-2">
      <div className="hidden md:flex gap-5 max-w-screen-lg mx-auto w-full items-center justify-between">
        <div className="flex-1 flex items-center gap-[1.5rem]">
          <Link to="/" className="inline-block min-w-[7rem]">
            <img src={Logo} alt="thejulge" className="w-[7rem] h-[2.625rem]" />
          </Link>

          <SearchInput />
        </div>

        <div className="flex items-center gap-8 text-sm font-bold">
          {isLoggedIn ? (
            <>
              <Link to={userPath}>{userNavLabel}</Link>
              <button onClick={handleLogout} className="cursor-pointer">
                로그아웃
              </button>
              {user && user.type === "employee" && <Alert userId={user.id} />}
            </>
          ) : (
            <>
              <Link to="/signin">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 md:hidden max-w-screen-xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={Logo} alt="thejulge" className="w-[7rem] h-[2.625rem]" />
          </Link>
          <div className="flex items-center gap-4 text-sm font-bold">
            {isLoggedIn ? (
              <>
                <Link to={userPath}>{userNavLabel}</Link>
                <button onClick={handleLogout} className="cursor-pointer">
                  로그아웃
                </button>
                {user && user.type === "employee" && <Alert userId={user.id} />}
              </>
            ) : (
              <>
                <Link to="/signin">로그인</Link>
                <Link to="/signup">회원가입</Link>
              </>
            )}
          </div>
        </div>

        <SearchInput />
      </div>
    </header>
  );
}
