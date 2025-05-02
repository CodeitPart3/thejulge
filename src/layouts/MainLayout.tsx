import { Outlet, useMatches } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

interface MainLayoutProps {
  isLoggedIn?: boolean;
  userNavLabel?: "내 가게" | "내 프로필";
  hasAlarm?: boolean;
  onLogout?: () => void;
  onToggleAlarm?: () => void;
}

interface RouteHandle {
  hideFooter?: boolean;
}

export default function MainLayout({
  isLoggedIn = false,
  userNavLabel,
  hasAlarm,
  onLogout,
  onToggleAlarm,
}: MainLayoutProps) {
  const matches = useMatches() as Array<{ handle?: RouteHandle }>;
  const hideFooter = matches.some((match) => match.handle?.hideFooter);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header
        isLoggedIn={isLoggedIn}
        userNavLabel={userNavLabel}
        hasAlarm={hasAlarm}
        onLogout={onLogout}
        onToggleAlarm={onToggleAlarm}
      />

      <main className="flex flex-col flex-1">
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}
