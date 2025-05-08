import { ChangeEvent, useEffect, useRef, useState } from "react";

import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { SeoulDistrict, SeoulDistricts, ShopCategory } from "../types";

import {
  getPublicURL,
  postImage,
  putImage,
} from "@/apis/services/imageService";
import { postShop } from "@/apis/services/shopService";
import { Camera, Close } from "@/assets/icon";
import Button from "@/components/Button";
import Select from "@/components/Select";
import TextField from "@/components/TextField";
import { ROUTES } from "@/constants/router";
import { CATEGORY_OPTIONS } from "@/constants/shopCategory";
import { MIN_WAGE, MAX_WAGE } from "@/constants/wage";
import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";
import { extractDigits, numberCommaFormatter } from "@/utils/number";

type FormType = {
  name: string;
  category: ShopCategory;
  address1: SeoulDistrict;
  address2: string;
  originalHourlyPay: string;
  description: string;
};

const FIELD_LABELS: Record<keyof FormType, string> = {
  name: "가게 이름",
  category: "분류",
  address1: "주소",
  address2: "상세 주소",
  originalHourlyPay: "기본 시급",
  description: "가게 설명",
};

export default function ShopRegisterPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useUserStore((state) => state.user);
  const updateShopId = useUserStore((state) => state.updateShopId);
  const openModal = useModalStore((state) => state.openModal);

  const [form, setForm] = useState<FormType>({
    name: "",
    category: "" as ShopCategory,
    address1: "" as SeoulDistrict,
    address2: "",
    originalHourlyPay: "",
    description: "",
  });

  useEffect(() => {
    if (!user) {
      openModal({
        type: "alert",
        iconType: "warning",
        message: "로그인 후에 이용 가능한 기능입니다.",
        onClose: () => navigate(ROUTES.AUTH.SIGNIN),
      });
      return;
    }

    if (user.type === "employee") {
      openModal({
        type: "alert",
        iconType: "warning",
        message: "사장님 계정으로만 이용 가능한 기능입니다.",
        onClose: () => navigate(ROUTES.PROFILE.ROOT),
      });
      return;
    }

    if (user.shopId) {
      navigate(ROUTES.SHOP.EDIT);
      return;
    }
  }, []);

  const handleChange = (
    key: keyof FormType,
    value: string | SeoulDistrict | ShopCategory,
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    const blobUrl = URL.createObjectURL(file);
    setImagePreview(blobUrl);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const requiredFields: Array<keyof FormType> = [
      "name",
      "category",
      "address1",
      "address2",
      "originalHourlyPay",
    ];

    const missingField = requiredFields.find((key) => form[key].trim() === "");

    if (missingField) {
      openModal({
        type: "alert",
        iconType: "warning",
        message: `${FIELD_LABELS[missingField]}을(를) 입력해 주세요.`,
      });
      return;
    }

    const hourlyPay = Number(extractDigits(form.originalHourlyPay));
    const formattedMaxWage = numberCommaFormatter(MAX_WAGE);

    if (hourlyPay < MIN_WAGE) {
      openModal({
        type: "alert",
        iconType: "warning",
        message: "시급은 최저시급 이상이어야 합니다.",
      });
      return;
    } else if (hourlyPay > MAX_WAGE) {
      openModal({
        type: "alert",
        iconType: "warning",
        message: `시급은 ${formattedMaxWage}원 이하여야 합니다.`,
      });
      return;
    }

    if (!imageFile) {
      openModal({
        type: "alert",
        iconType: "warning",
        message: "이미지를 추가해 주세요.",
      });
      return;
    }

    setIsSubmitting(true);

    let imageUrl = "";
    const payload = {
      name: form.name.trim(),
      category: form.category,
      address1: form.address1,
      address2: form.address2.trim(),
      originalHourlyPay: hourlyPay,
      description: form.description.trim(),
      imageUrl,
    };

    try {
      if (imageFile) {
        const presignedURL = await postImage(imageFile.name);
        await putImage(presignedURL, imageFile);
        imageUrl = getPublicURL(presignedURL);
        payload.imageUrl = imageUrl;
      }
      const res = await postShop(payload);
      const newShopId = res.data.item.id;
      updateShopId(newShopId);

      openModal({
        type: "message",
        iconType: "none",
        message: "등록이 완료되었습니다.",
        onClose: () => navigate(ROUTES.SHOP.ROOT),
      });
    } catch (e: unknown) {
      const error = e as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
      openModal({
        type: "alert",
        iconType: "warning",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-gray-5 min-h-screen">
      <form
        className="w-full max-w-[964px] mx-auto px-4 py-12"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="sm:text-[1.75rem] text-[1.25rem] font-bold">
            가게 정보
          </h2>
          <button type="button" onClick={() => navigate("/shop")}>
            <Close className="sm:w-8 sm:h-8 w-6 h-6 cursor-pointer" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 mb-6">
          <TextField.Input
            label="가게 이름*"
            placeholder="입력"
            fullWidth
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Select
            label="분류*"
            placeholder="선택"
            fullWidth
            options={CATEGORY_OPTIONS}
            value={form.category}
            onValueChange={(value) => handleChange("category", value)}
          />
          <Select
            label="주소*"
            placeholder="선택"
            fullWidth
            options={SeoulDistricts.map((d) => ({ label: d, value: d }))}
            value={form.address1}
            onValueChange={(value) => handleChange("address1", value)}
          />
          <TextField.Input
            label="상세 주소*"
            placeholder="입력"
            fullWidth
            value={form.address2}
            onChange={(e) => handleChange("address2", e.target.value)}
          />
          <TextField.Input
            label="기본 시급*"
            placeholder="입력"
            fullWidth
            value={form.originalHourlyPay}
            onChange={(e) => {
              const rawValue = e.target.value;
              const digitsOnly = extractDigits(rawValue);
              const formatted = digitsOnly
                ? numberCommaFormatter(Number(digitsOnly))
                : "";
              handleChange("originalHourlyPay", formatted);
            }}
            postfix={<span className="text-black mr-2">원</span>}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2">가게 이미지*</label>
          <div
            className="sm:w-[483px] sm:h-[276px] w-full h-[200px] rounded-lg bg-gray-10 border border-gray-30 flex justify-center items-center overflow-hidden cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-40">
                <Camera className="w-8 h-8 mb-2.75" />
                <span>이미지 추가하기</span>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </div>
        <div className="mb-10">
          <TextField.TextArea
            label="가게 설명 (최대 200자)"
            placeholder="입력"
            fullWidth
            rows={4}
            value={form.description}
            maxLength={200}
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
    </div>
  );
}
