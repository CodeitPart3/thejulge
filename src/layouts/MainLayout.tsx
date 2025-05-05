import { Outlet, useMatches } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

interface RouteHandle {
  hideFooter?: boolean;
}

export default function MainLayout() {
  const matches = useMatches() as Array<{ handle?: RouteHandle }>;
  const hideFooter = matches.some((match) => match.handle?.hideFooter);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-col flex-1">
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}
