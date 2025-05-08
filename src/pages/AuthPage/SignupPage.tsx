import { useState, useEffect } from "react";

import { AxiosError } from "axios";
import clsx from "clsx";
import { useNavigate, Link } from "react-router-dom";

import IconCheck from "../../assets/icon/check.svg?react";
import Logo from "../../assets/landing/logo-white.svg?react";

import Spinner from "./components/Spinner";
import { useAuthForm } from "./hooks/useAuthForm";

import { postUser } from "@/apis/services/userService";
import LandingImage from "@/assets/landing/landing-img.webp";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { ROUTES } from "@/constants/router";
import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";

export default function SignupPage() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { openModal, closeModal } = useModalStore();

  const {
    formData,
    errors,
    isFormValid,
    handleChange,
    setFormData,
    resetForm,
  } = useAuthForm("signup");

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user || location.pathname === ROUTES.AUTH.SIGNUP) return;
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
      const response = await postUser({
        email: formData.email,
        password: formData.password,
        type: formData.userType!,
      });

      if (response.status === 201) {
        resetForm();

        openModal({
          type: "message",
          message: "가입이 완료되었습니다!",
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
            navigate(ROUTES.AUTH.SIGNIN);
          },
        });
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message ??
        "회원가입 실패! 다시 시도해주세요.";

      openModal({
        type: "message",
        message,
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
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <TextField.Input
                id="email"
                label="이메일"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={formData.email}
                onChange={handleChange("email")}
                fullWidth
                validateMessage={errors.email}
              />

              <TextField.Input
                id="password"
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={formData.password}
                onChange={handleChange("password")}
                fullWidth
                validateMessage={errors.password}
              />

              <TextField.Input
                id="confirm-password"
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 한 번 더 입력해 주세요"
                value={formData.confirmPassword || ""}
                onChange={handleChange("confirmPassword")}
                fullWidth
                validateMessage={errors.confirmPassword}
              />

              <fieldset className="space-y-2">
                <legend className="text-base font-normal text-black">
                  회원 유형
                </legend>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="white"
                    fullWidth
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, userType: "employee" }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && isFormValid) {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                    className={clsx(
                      "flex items-center justify-center gap-[0.5625rem] rounded-[1.875rem] border px-[2.5625rem] py-[0.8125rem] focus:outline-none focus:ring-0",
                      formData.userType === "employee"
                        ? "border-primary"
                        : "border-gray-30",
                    )}
                  >
                    <div
                      className={clsx(
                        "h-5 w-5 rounded-full",
                        formData.userType !== "employee" &&
                          "border border-gray-30",
                      )}
                    >
                      {formData.userType === "employee" && (
                        <IconCheck className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-sm font-normal text-black">
                      알바님
                    </span>
                  </Button>

                  <Button
                    type="button"
                    variant="white"
                    fullWidth
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, userType: "employer" }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && isFormValid) {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                    className={clsx(
                      "flex items-center justify-center gap-[0.5625rem] rounded-[1.875rem] border px-[2.5625rem] py-[0.8125rem] focus:outline-none focus:ring-0",
                      formData.userType === "employer"
                        ? "border-primary"
                        : "border-gray-30",
                    )}
                  >
                    <div
                      className={clsx(
                        "h-5 w-5 rounded-full",
                        formData.userType !== "employer" &&
                          "border border-gray-30",
                      )}
                    >
                      {formData.userType === "employer" && (
                        <IconCheck className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-sm font-normal text-black">
                      사장님
                    </span>
                  </Button>
                </div>
              </fieldset>

              <Button
                type="submit"
                fullWidth
                className="py-[0.875rem] flex justify-center items-center gap-2"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting && <Spinner />}
                {isSubmitting ? "가입 중..." : "가입하기"}
              </Button>
            </form>

            <p className="mt-[1rem] text-center text-sm text-gray-500">
              이미 가입하셨나요?{" "}
              <Link
                to={ROUTES.AUTH.SIGNIN}
                className="text-[#FF3C3C] underline"
              >
                로그인하기
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
