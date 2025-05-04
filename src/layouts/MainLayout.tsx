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
  hasAlarm,
  onToggleAlarm,
}: MainLayoutProps) {
  const matches = useMatches() as Array<{ handle?: RouteHandle }>;
  const hideFooter = matches.some((match) => match.handle?.hideFooter);

  return (
    <div className="w-full min-h-screen flex flex-col ">
      <Header hasAlarm={hasAlarm} onToggleAlarm={onToggleAlarm} />

      <main className="flex flex-col flex-1">
        <div className="max-w-screen-xl w-full mx-auto">
          <Outlet />
        </div>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}
