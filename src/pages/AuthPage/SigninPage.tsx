import { useState, useEffect } from "react";

import { AxiosError } from "axios";
import { useNavigate, Link } from "react-router-dom";

import Logo from "../../assets/landing/logo-white.svg?react";

import Spinner from "./components/Spinner";
import { useAuthForm } from "./hooks/useAuthForm";

import { postAuthentication } from "@/apis/services/authenticationService";
import LandingImage from "@/assets/landing/landing-img.webp";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { ROUTES } from "@/constants/router";
import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <main className="relative w-screen h-screen bg-[#FF3C3C] overflow-hidden">
      <div className="absolute top-10 left-10 pointer-events-auto z-50">
        <Link to={ROUTES.NOTICE.ROOT}>
          <Logo className="mx-auto mb-2 h-[2.375rem] sm:h-[2.8125rem] w-[13rem] sm:w-[15.5rem]" />
        </Link>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <section className="hidden lg:flex flex-col justify-center items-start w-[50%] max-w-[720px] pl-20 pr-10 z-0">
          <h2 className="text-white font-bold text-[4rem] leading-tight mb-6">
            <span className="text-[#fff] text-[4.5rem] mr-2">더</span> 나은
            조건,
            <br />
            <span className="text-[#fff] text-[4.5rem] mr-2">더</span> 나은 선택
          </h2>
          <p className="text-white text-2xl mb-12">
            당신에게{" "}
            <span className="font-bold text-[2.25rem] text-white mr-1">더</span>
            줄게요.
          </p>
          <img
            src={LandingImage}
            alt="LandingImage"
            className="w-full max-w-[620px]"
          />
        </section>

        <section className="w-full lg:w-[480px] z-10 flex justify-center">
          <div className="h-[41.125rem] bg-white p-[2.5rem] sm:p-[3rem] rounded-2xl shadow-xl w-[90%] max-w-[420px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <TextField.Input
                label="이메일"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="이메일을 입력해주세요"
                fullWidth
                validateMessage={errors.email}
                className="focus:outline-none"
              />
              <TextField.Input
                label="비밀번호"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange("password")}
                placeholder="비밀번호를 입력해주세요"
                fullWidth
                validateMessage={errors.password}
              />
              <Button
                type="submit"
                fullWidth
                className="bg-[#FF3C3C] text-white py-3 text-lg font-semibold rounded"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? <Spinner /> : "로그인 하기"}
              </Button>
            </form>
            <p className="mt-5 text-center text-sm text-gray-500">
              아직 계정이 없으신가요?{" "}
              <Link
                to={ROUTES.AUTH.SIGNUP}
                className="underline text-[#FF3C3C]"
              >
                회원가입
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
