import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
interface MainLayoutProps {
  isLoggedIn?: boolean;
  userNavLabel?: "내 가게" | "내 프로필";
  hasAlarm?: boolean;
  onLogout?: () => void;
  onToggleAlarm?: () => void;
}

export default function MainLayout({
  isLoggedIn = false,
  userNavLabel,
  hasAlarm,
  onLogout,
  onToggleAlarm,
}: MainLayoutProps) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full max-w-[90rem] mx-auto flex-1 px-4 tablet:px-10 pc:px-20">
        <Header
          isLoggedIn={isLoggedIn}
          userNavLabel={userNavLabel}
          hasAlarm={hasAlarm}
          onLogout={onLogout}
          onToggleAlarm={onToggleAlarm}
        />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
