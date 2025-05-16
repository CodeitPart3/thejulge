import { Outlet } from "react-router-dom";

import LandingImage from "@/assets/logo/landing-img.webp";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex justify-center items-start sm:items-center pt-[4.5625rem] px-2 sm:p-4 bg-primary">
      <div className="flex flex-row justify-center w-full max-w-[1024px] gap-2">
        <div className="hidden md:flex flex-col">
          <div className="hidden md:flex flex-col">
            <div>
              <h1 className="text-5xl tracking-wider text-white">
                <span className="text-6xl">더</span> 나은 조건,
                <br />
                <span className="text-6xl">더</span> 나은 선택
              </h1>

              <p className="mt-10 text-xl text-white">
                당신에게
                <span className="text-2xl font-bold"> 더 </span>
                줄게요.
              </p>
            </div>
          </div>

          <div className="flex-grow mt-30 mr-10">
            <img
              src={LandingImage}
              alt="더줄게 소개 일러스트"
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="bg-white w-full max-w-md rounded-2xl shadow-md px-4 py-8 shrink-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
