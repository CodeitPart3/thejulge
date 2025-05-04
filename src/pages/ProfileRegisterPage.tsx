import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { SeoulDistrict, SeoulDistricts } from "../types";

import { putUser } from "@/apis/services/userService";
import { Close } from "@/assets/icon";
import Button from "@/components/Button";
import Select from "@/components/Select";
import TextField from "@/components/TextField";
import { ROUTES } from "@/constants/router";
import { useUserStore } from "@/hooks/useUserStore";
import { autoHyphenFormatter } from "@/utils/phoneNumber";

type FormType = {
  name: string;
  phone: string;
  address: SeoulDistrict | undefined;
  bio: string;
};

const FIELD_LABELS: Record<keyof FormType, string> = {
  name: "이름",
  phone: "연락처",
  address: "선호 지역",
  bio: "소개",
};

export default function ProfileRegisterPage() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<FormType>({
    name: "",
    phone: "",
    address: undefined,
    bio: "",
  });

  const handleChange = (key: keyof FormType, value: string | SeoulDistrict) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    if (isSubmitting) return;

    const requiredFields: Array<keyof FormType> = ["name", "phone"];

    const missingField = requiredFields.find((key) => {
      const value = form[key];
      return typeof value === "string" && value.trim() === "";
    });

    if (missingField) {
      alert(`${FIELD_LABELS[missingField]}을(를) 입력해 주세요.`);
      return;
    }

    setIsSubmitting(true);
    const payload = {
      name: form.name.trim(),
      phone: form.phone,
      address: form.address,
      bio: form.bio.trim(),
    };

    try {
      await putUser(user.id, payload);
      navigate(ROUTES.PROFILE.ROOT);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="w-full max-w-[964px] mx-auto px-4 py-12"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="sm:text-[1.75rem] text-[1.25rem] font-bold">
          내 프로필
        </h2>
        <button onClick={() => navigate("/profile")}>
          <Close className="sm:w-8 sm:h-8 w-6 h-6 cursor-pointer" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mb-6">
        <TextField.Input
          label="이름*"
          placeholder="입력"
          fullWidth
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          maxLength={20}
        />
        <TextField.Input
          label="연락처*"
          placeholder="입력"
          fullWidth
          value={form.phone}
          onChange={(e) => {
            const formatted = autoHyphenFormatter(e.target.value);
            handleChange("phone", formatted);
          }}
        />
        <Select
          label="선호 지역"
          placeholder="선택"
          fullWidth
          options={SeoulDistricts.map((d) => ({ label: d, value: d }))}
          value={form.address}
          onValueChange={(value) => handleChange("address", value)}
        />
      </div>
      <div className="mb-10">
        <TextField.TextArea
          label="소개"
          placeholder="입력"
          fullWidth
          rows={4}
          value={form.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
        />
      </div>
      <div className="text-center">
        <Button
          variant="primary"
          textSize="md"
          className="sm:w-[350px] w-full px-34 py-3.5"
          disabled={isSubmitting}
          type="submit"
        >
          등록하기
        </Button>
      </div>
    </form>
  );
}
