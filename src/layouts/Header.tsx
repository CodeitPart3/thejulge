import { Link } from "react-router-dom";

import ActiveAlarmIcon from "../assets/icon/active.svg";
import InActiveAlarmIcon from "../assets/icon/inactive.svg";
import SearchIcon from "../assets/icon/search.svg";
import Logo from "../assets/logo/thejulge.svg";
interface HeaderProps {
  isLoggedIn: boolean;
  userNavLabel?: string; // "내 가게" or "내 프로필"
  hasAlarm?: boolean;
  onLogout?: () => void;
  onToggleAlarm?: () => void;
}

function Header({
  isLoggedIn,
  userNavLabel,
  hasAlarm,
  onLogout,
  onToggleAlarm,
}: HeaderProps) {
  const userPath = userNavLabel === "내 가게" ? "/shop" : "/profile";
  const alarmIcon = hasAlarm ? ActiveAlarmIcon : InActiveAlarmIcon;

  return (
    <header className="w-full flex  justify-between items-center h-[4.375rem] bg-[var(--color-white)]] sm:py-0">
      <div className="flex items-center gap-[3.125rem]">
        <Link to="/">
          <img src={Logo} alt="thejulge" />
        </Link>
        <div className="relative w-full sm:w-[28.125rem] order-1 sm:order-none bg-[var(--color-gray-10)] border border-transparent rounded-[0.625rem]">
          <img
            src={SearchIcon}
            alt="SearchIcon"
            className="absolute inset-y-2.5 left-3 flex items-center"
          />
          <input
            type="text"
            placeholder="가게 이름으로 찾아보세요"
            className="pl-10 w-[28.125rem] h-[2.5rem] gap-[0.625rem] rounded-[0.625rem] p-[0.625rem] bg-[var(--color-gray-10)] placeholder:font-normal placeholder:text-[0.875rem] placeholder:leading-[1.375rem] placeholder:tracking-[0%] placeholder:align-middle placeholder:text-[var(--color-gray-40)]"
          />
        </div>
      </div>

      <div className="w-[13.1875rem] h-[1.5rem] flex items-center gap-[2.5rem] font-bold text-[1rem] leading-[1.25rem] tracking-[0%] text-right align-middle text-[var(--color-black)]]">
        {isLoggedIn ? (
          <>
            <Link to={userPath}>{userNavLabel}</Link>
            <button onClick={onLogout} className="cursor-pointer">
              로그아웃
            </button>
            <button className="cursor-pointer" onClick={onToggleAlarm}>
              <img src={alarmIcon} alt="AlertIcon" />
            </button>
          </>
        ) : (
          <>
            <Link to="/signin">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
