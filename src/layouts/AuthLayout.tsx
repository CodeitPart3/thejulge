import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-[21.875rem]">
        <Outlet />
      </div>
    </div>
  );
}
