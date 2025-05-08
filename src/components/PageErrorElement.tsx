import { AxiosError } from "axios";
import { useNavigate, useRouteError } from "react-router-dom";

import Button from "./Button";

import { ROUTES } from "@/constants/router";

function PageErrorElement() {
  const navigate = useNavigate();
  const error = useRouteError() as AxiosError;
  console.error(error);

  const goHome = () => navigate(ROUTES.NOTICE.ROOT);
  const goBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate(ROUTES.NOTICE.ROOT);
  };

  return (
    <div className="flex-1 flex flex-col items-center gap-6 sm:gap-10 mt-20 sm:mt-48">
      <h1 className="text-2xl sm:text-3xl">문제가 발생했습니다.</h1>
      <div className="flex gap-5">
        <Button
          variant="primary"
          textSize="md"
          className="px-6 py-3"
          onClick={goHome}
        >
          메인페이지로
        </Button>
        <Button
          variant="white"
          textSize="md"
          className="px-6 py-3"
          onClick={goBack}
        >
          이전 페이지로
        </Button>
      </div>
    </div>
  );
}

export default PageErrorElement;
