import { useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import { ROUTES } from "@/constants/router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const goHome = () => navigate(ROUTES.NOTICE.ROOT);
  const goBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate(ROUTES.NOTICE.ROOT);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 pt-20">
      <h1 className="text-3xl font-bold">잘못된 경로입니다</h1>
      <p className="text-gray-500 text-sm">
        주소를 다시 확인하거나 아래 버튼을 이용해 주세요.
      </p>
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
    </section>
  );
}
