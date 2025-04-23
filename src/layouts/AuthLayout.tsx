import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[21.875rem]">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
