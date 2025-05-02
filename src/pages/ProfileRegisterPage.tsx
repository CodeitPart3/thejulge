import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { SeoulDistrict, SeoulDistricts } from "../types";

import { putUser } from "@/apis/services/userService";
import { Close } from "@/assets/icon";
import Button from "@/components/Button";
import Select from "@/components/Select";
import TextField from "@/components/TextField";
import { useUserStore } from "@/hooks/useUserStore";
import { autoHyphenFormatter } from "@/utils/phoneNumber";

export default function ProfileRegisterPage() {
  const navigate = useNavigate();
  const { user, token, isLoggedIn } = useUserStore();
  console.log("🧪 상태 확인:", { user, token, isLoggedIn });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: undefined,
    bio: "",
  });

  const handleChange = (
    key: keyof typeof form,
    value: string | SeoulDistrict,
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    if (isSubmitting) return;

    const requiredFields: Array<keyof typeof form> = ["name", "phone"];

    const missingField = requiredFields.find((key) => {
      const value = form[key];
      return typeof value === "string" && value.trim() === "";
    });

    if (missingField) {
      alert("모든 필수 항목을 입력해 주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        name: form.name.trim(),
        phone: form.phone,
        address: form.address,
        bio: form.bio.trim(),
      };

      await putUser(user.id, payload);
      navigate("/profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[964px] mx-auto px-4 py-12">
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
        />
        <TextField.Input
          label="연락처*"
          placeholder="입력"
          fullWidth
          value={form.phone}
          onChange={(e) => {
            autoHyphenFormatter(e.target);
            handleChange("phone", e.target.value);
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
          onClick={handleSubmit}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}
