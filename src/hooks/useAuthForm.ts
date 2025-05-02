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
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setErrors((prev) => ({
          ...prev,
          email: isValidEmail ? undefined : "올바른 이메일 형식이 아닙니다.",
        }));
      }

      if (field === "password") {
        setErrors((prev) => ({
          ...prev,
          password:
            value.length >= 8 ? undefined : "비밀번호는 8자 이상이어야 합니다.",
          ...(mode === "signup" &&
            formData.confirmPassword && {
              confirmPassword:
                value !== formData.confirmPassword
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
