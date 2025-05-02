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
  hasAlarm,
  onToggleAlarm,
}: MainLayoutProps) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header hasAlarm={hasAlarm} onToggleAlarm={onToggleAlarm} />

      <main className="flex flex-col flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
