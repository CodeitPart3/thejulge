import { useState, useMemo } from "react";

type Mode = "signup" | "signin";
type UserType = "employee" | "employer";

type FormData = {
  email: string;
  password: string;
  confirmPassword?: string;
  userType?: UserType;
};

type FormErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function useAuthForm(mode: Mode) {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    ...(mode === "signup" && { confirmPassword: "", userType: "employee" }),
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const isFormValid = useMemo(() => {
    if (!formData.email || !formData.password) return false;
    if (errors.email || errors.password) return false;

    if (mode === "signup") {
      if (!formData.confirmPassword || !formData.userType) return false;
      if (errors.confirmPassword) return false;
    }

    return true;
  }, [formData, errors, mode]);

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (field === "email") {
        setErrors((prev) => ({
          ...prev,
          email:
            value.length === 0
              ? undefined
              : value.includes("@")
                ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                  ? undefined
                  : "올바른 이메일 형식이 아닙니다."
                : undefined,
        }));
      }

      if (field === "password") {
        const trimmed = value.trim();
        setErrors((prev) => ({
          ...prev,
          password:
            value.length > 0 && trimmed.length === 0
              ? "비밀번호에 공백만 입력할 수 없습니다."
              : trimmed.length > 0 && trimmed.length < 8
                ? "비밀번호는 최소 8자 이상이어야 합니다."
                : undefined,
          ...(mode === "signup" &&
            formData.confirmPassword && {
              confirmPassword:
                trimmed !== formData.confirmPassword
                  ? "비밀번호가 일치하지 않습니다."
                  : undefined,
            }),
        }));
      }

      if (mode === "signup" && field === "confirmPassword") {
        setErrors((prev) => ({
          ...prev,
          confirmPassword:
            value !== formData.password
              ? "비밀번호가 일치하지 않습니다."
              : undefined,
        }));
      }
    };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      ...(mode === "signup" && { confirmPassword: "", userType: "employee" }),
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    isFormValid,
    handleChange,
    setFormData,
    resetForm,
  };
}
