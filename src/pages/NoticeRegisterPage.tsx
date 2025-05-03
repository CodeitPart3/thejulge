import { useState } from "react";

import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

import { postNotice } from "@/apis/services/noticeService";
import { Close } from "@/assets/icon";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import { ROUTES } from "@/constants/router";
import { useUserStore } from "@/hooks/useUserStore";
import { extractDigits, numberCommaFormatter } from "@/utils/number";

type FormType = {
  hourlyPay: string;
  startsAt: Date | null;
  workhour: string;
  description: string;
};

const FIELD_LABELS: Record<keyof FormType, string> = {
  hourlyPay: "시급",
  startsAt: "시작 일시",
  workhour: "업무 시간",
  description: "공고 설명",
};

export default function NoticeRegisterPage() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<FormType>({
    hourlyPay: "",
    startsAt: null,
    workhour: "",
    description: "",
  });

  const handleChange = (key: keyof FormType, value: string | null | Date) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    if (!user?.shopId) {
      alert("가게 정보가 없습니다.");
      return;
    }

    if (isSubmitting) return;

    const requiredFields: Array<keyof FormType> = [
      "hourlyPay",
      "startsAt",
      "workhour",
    ];

    const missingField = requiredFields.find((key) => {
      const value = form[key];
      return (
        value === null || (typeof value === "string" && value.trim() === "")
      );
    });

    if (missingField) {
      alert(`${FIELD_LABELS[missingField]}을(를) 입력해 주세요.`);
      return;
    }

    const hourlyPay = Number(extractDigits(form.hourlyPay));
    if (isNaN(hourlyPay) || hourlyPay <= 0) {
      alert("유효한 시급을 입력해 주세요.");
      return;
    }

    const workhour = Number(form.workhour);
    if (isNaN(workhour) || workhour <= 0) {
      alert("유효한 업무 시간을 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      hourlyPay: hourlyPay,
      startsAt: form.startsAt!.toISOString(),
      workhour: workhour,
      description: form.description.trim(),
    };

    try {
      await postNotice(user.shopId, payload);
      navigate(ROUTES.SHOP.ROOT);
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
          공고 등록
        </h2>
        <button onClick={() => navigate("/shop")}>
          <Close className="sm:w-8 sm:h-8 w-6 h-6 cursor-pointer" />
        </button>
      </div>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mb-6">
        <TextField.Input
          label="시급*"
          placeholder="입력"
          fullWidth
          value={form.hourlyPay}
          onChange={(e) => {
            const rawValue = e.target.value;
            const digitsOnly = extractDigits(rawValue);
            const formatted = digitsOnly
              ? numberCommaFormatter(Number(digitsOnly))
              : "";
            handleChange("hourlyPay", formatted);
          }}
          postfix={<span className="text-black mr-2">원</span>}
        />
        <div className="flex flex-col">
          <label className="inline-block mb-2 leading-[1.625rem]">
            시작 일시*
          </label>
          <DatePicker
            selected={form.startsAt}
            onChange={(date) => handleChange("startsAt", date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={10}
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="선택"
            className="w-full border border-gray-30 focus-within:border-blue-20 rounded-[0.375rem] py-4 px-5 text-[1rem]"
          />
        </div>
        <TextField.Input
          label="업무 시간*"
          placeholder="입력"
          fullWidth
          value={form.workhour}
          onChange={(e) => handleChange("workhour", e.target.value)}
          postfix={
            <span className="text-black mr-2 whitespace-nowrap">시간</span>
          }
        />
      </div>
      <div className="mb-10">
        <TextField.TextArea
          label="공고 설명"
          placeholder="입력"
          fullWidth
          rows={4}
          maxLength={500}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
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
