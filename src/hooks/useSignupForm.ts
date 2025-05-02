import { useState, useMemo } from "react";

type UserType = "employee" | "employer";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
};

type FormErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function useSignupForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "employee",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const isFormValid = useMemo(() => {
    return (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword
    );
  }, [formData, errors]);

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
          confirmPassword:
            formData.confirmPassword && value !== formData.confirmPassword
              ? "비밀번호가 일치하지 않습니다."
              : undefined,
        }));
      }
      if (field === "confirmPassword") {
        setErrors((prev) => ({
          ...prev,
          confirmPassword:
            formData.password && value !== formData.password
              ? "비밀번호가 일치하지 않습니다."
              : undefined,
        }));
      }
    };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      userType: "employee",
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
