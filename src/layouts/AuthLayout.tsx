import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex justify-center items-start pt-[8.75rem] sm:pt-[17.5rem]">
      <div className="w-[21.875rem]">
        <Outlet />
      </div>
    </div>
  );
}
