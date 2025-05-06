import { AxiosError } from "axios";
import { useNavigate, useRouteError } from "react-router-dom";

import Button from "./Button";

import { ROUTES } from "@/constants/router";

function PageErrorElement() {
  const navigate = useNavigate();
  const error = useRouteError() as AxiosError;
  console.error(error);

  return (
    <div className="flex-1 flex flex-col items-center gap-6 md:gap-10 mt-20 md:mt-48">
      <h1 className="text-2xl md:text-3xl">문제가 발생했습니다.</h1>
      <div className="flex gap-4">
        <Button
          variant="white"
          className="py-4 px-5"
          onClick={() => navigate(-1)}
        >
          이전으로
        </Button>
        <Button
          className="py-4 px-5"
          onClick={() => navigate(ROUTES.NOTICE.ROOT)}
        >
          홈으로
        </Button>
      </div>
    </div>
  );
}

export default PageErrorElement;
