import { AxiosError } from "axios";
import clsx from "clsx";
import { useNavigate, Link } from "react-router-dom";

import IconCheck from "../assets/icon/check.svg?react";
import Logo from "../assets/logo/thejulge.svg?react";
import { useSignupForm } from "../hooks/useSignupForm";

import { postAuthentication } from "@/apis/services/authenticationService";
import { postUser } from "@/apis/services/userService";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { ROUTES } from "@/constants/router";
import { useUserStore } from "@/hooks/useUserStore";

export default function SignupPage() {
  const navigate = useNavigate();
  const { setUserAndToken } = useUserStore();

  const {
    formData,
    errors,
    isFormValid,
    handleChange,
    setFormData,
    resetForm,
  } = useSignupForm();
  //Alert 사용시
  // const [alertMessage, setAlertMessage] = useState("");
  // const [nextRoute, setNextRoute] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await postUser({
        email: formData.email,
        password: formData.password,
        type: formData.userType,
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

        navigate(
          user.type === "employer" ? ROUTES.SHOP.ROOT : ROUTES.PROFILE.ROOT,
        );
        //Alert 사용
        // setAlertMessage("가입이 완료되었습니다!");
        // setNextRoute(user.type === "employer" ? ROUTES.SHOP.ROOT : ROUTES.PROFILE.ROOT);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message ?? "알 수 없는 에러 발생";

      console.log(message);
      //Alert 사용시
      // setAlertMessage(message ?? "회원가입 실패! 다시 시도해주세요.");
      // setNextRoute(null);
    }
  };

  return (
    <div className="w-full">
      <Link to={ROUTES.NOTICE.ROOT}>
        <Logo className="mx-auto mb-2 h-[45px] w-[248px]" />
      </Link>

      <form
        className="mt-[40px] mx-auto flex max-w-sm flex-col gap-[28px]"
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
          value={formData.confirmPassword}
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
              className={clsx(
                "flex items-center justify-center gap-[9px] rounded-[30px] border px-[41px] py-[13px]",
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
              className={clsx(
                "flex items-center justify-center gap-[9px] rounded-[30px] border px-[41px] py-[13px]",
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
          type="button"
          fullWidth
          className="py-[14px]"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          가입하기
        </Button>
      </form>

      <p className="mt-[16px] text-center text-sm">
        이미 가입하셨나요?{" "}
        <Link to={ROUTES.AUTH.SIGNIN} className="text-[#5534DA] underline">
          로그인하기
        </Link>
      </p>

      {/* 임시 Alert */}
      {/* {alertMessage && (
        <AlertModal
          message={alertMessage}
          onClose={() => {
            setAlertMessage("");
            if (nextRoute) {
              navigate(nextRoute);
              setNextRoute(null);
            }
          }}
        />
      )} */}
    </div>
  );
}
