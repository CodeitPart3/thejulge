import { useState, useEffect } from "react";

import { AxiosError } from "axios";
import { useNavigate, Link } from "react-router-dom";

import Logo from "../../assets/logo/thejulge.svg?react";

import Spinner from "./components/Spinner";
import { useAuthForm } from "./hooks/useAuthForm";

import { postAuthentication } from "@/apis/services/authenticationService";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { ROUTES } from "@/constants/router";
import { useUserStore } from "@/hooks/useUserStore";
import { useModalStore } from "@/store/useModalStore";

export default function SigninPage() {
  const navigate = useNavigate();
  const { user, setUserAndToken } = useUserStore();
  const { openModal, closeModal } = useModalStore();

  const { formData, errors, isFormValid, handleChange, resetForm } =
    useAuthForm("signin");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.type === "employer") {
        navigate(ROUTES.SHOP.ROOT);
      } else if (user.type === "employee") {
        navigate(ROUTES.PROFILE.ROOT);
      }
    }
  }, [user, navigate]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await postAuthentication({
        email: formData.email,
        password: formData.password,
      });

      const token = res.data.item.token;
      const user = res.data.item.user.item;

      setUserAndToken(user, token);

      resetForm();

      const route =
        user.type === "employer" ? ROUTES.SHOP.ROOT : ROUTES.PROFILE.ROOT;

      openModal({
        type: "message",
        message: "로그인에 성공했습니다!",
        iconType: "none",
        buttons: [
          {
            label: "확인",
            style: "primary",
            onClick: () => {
              closeModal();
            },
          },
        ],
        onClose: () => {
          navigate(route);
        },
      });
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message ?? "로그인 실패! 다시 시도해주세요.";

      openModal({
        type: "message",
        message: message,
        iconType: "none",
        buttons: [
          {
            label: "확인",
            style: "primary",
            onClick: () => {
              closeModal();
            },
          },
        ],
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-[8.75rem] sm:pt-0">
      <Link to={ROUTES.NOTICE.ROOT}>
        <Logo className="mx-auto mb-2 h-[2.375rem] sm:h-[2.8125rem] w-[13rem] sm:w-[15.5rem]" />
      </Link>

      <form
        className="mt-[2.5rem] mx-auto flex max-w-sm flex-col gap-[1.75rem]"
        onSubmit={(e) => {
          e.preventDefault();
          if (isFormValid) {
            handleSubmit();
          }
        }}
      >
        <TextField.Input
          id="email"
          label="이메일"
          type="email"
          placeholder="입력"
          value={formData.email}
          onChange={handleChange("email")}
          fullWidth
          validateMessage={errors.email}
        />

        <TextField.Input
          id="password"
          label="비밀번호"
          type="password"
          placeholder="입력"
          value={formData.password}
          onChange={handleChange("password")}
          fullWidth
          validateMessage={errors.password}
        />

        <Button
          type="submit"
          fullWidth
          className="py-[0.875rem] flex justify-center items-center gap-2"
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting && <Spinner />}
          {isSubmitting ? "로그인 중..." : "로그인하기"}
        </Button>
      </form>

      <p className="mt-[1rem] text-center text-sm">
        회원이 아니신가요?{" "}
        <Link to={ROUTES.AUTH.SIGNUP} className="text-[#5534DA] underline">
          회원가입하기
        </Link>
      </p>
    </div>
  );
}
