import { useState } from "react";

import { AxiosError } from "axios";
import clsx from "clsx";
import { useNavigate, Link } from "react-router-dom";

import IconCheck from "../../assets/icon/check.svg?react";
import Logo from "../../assets/logo/thejulge.svg?react";

import Spinner from "./components/Spinner";
import { useAuthForm } from "./hooks/useAuthForm";

import { postAuthentication } from "@/apis/services/authenticationService";
import { postUser } from "@/apis/services/userService";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { ROUTES } from "@/constants/router";
import { useUserStore } from "@/hooks/useUserStore";
import { useModalStore } from "@/store/useModalStore";

export default function SignupPage() {
  const navigate = useNavigate();
  const { setUserAndToken } = useUserStore();
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
        const loginRes = await postAuthentication({
          email: formData.email,
          password: formData.password,
        });

        const token = loginRes.data.item.token;
        const user = loginRes.data.item.user.item;

        setUserAndToken(user, token);

        resetForm();

        const route =
          user.type === "employer" ? ROUTES.SHOP.ROOT : ROUTES.PROFILE.ROOT;

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
            navigate(route);
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
    <div className="w-full">
      <Link to={ROUTES.NOTICE.ROOT}>
        <Logo className="mx-auto mb-2 h-[2.375rem] sm:h-[2.8125rem] w-[13rem] sm:w-[15.5rem]" />
      </Link>

      <form
        className="mt-[2.5rem] mx-auto flex max-w-sm flex-col gap-[1.75rem]"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
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

        <TextField.Input
          id="confirm-password"
          label="비밀번호 확인"
          type="password"
          placeholder="입력"
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
                  formData.userType !== "employee" && "border border-gray-30",
                )}
              >
                {formData.userType === "employee" && (
                  <IconCheck className="h-5 w-5" />
                )}
              </div>
              <span className="text-sm font-normal text-black">알바님</span>
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
                  formData.userType !== "employer" && "border border-gray-30",
                )}
              >
                {formData.userType === "employer" && (
                  <IconCheck className="h-5 w-5" />
                )}
              </div>
              <span className="text-sm font-normal text-black">사장님</span>
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

      <p className="mt-[1rem] text-center text-sm">
        이미 가입하셨나요?{" "}
        <Link to={ROUTES.AUTH.SIGNIN} className="text-[#5534DA] underline">
          로그인하기
        </Link>
      </p>
    </div>
  );
}
