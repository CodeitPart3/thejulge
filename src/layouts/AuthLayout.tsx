import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-start justify-center pt-[8.75rem] sm:pt-[17.5rem] lg:pt-[19.5rem] ">
      <div className="w-[21.875rem]">
        <Outlet />
      </div>
    </div>
  );
}
