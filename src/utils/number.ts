/**
 * 숫자를 전달받아 콤마(,)를 더해 반환합니다.
 * @example numberCommaFormatter(20000) -> 20,000
 */
export const numberCommaFormatter = Intl.NumberFormat("ko-kr", {
  compactDisplay: "long",
}).format;

/**
 * 콤마가 포함된 숫자를 일반 숫자형으로 반환합니다.
 * @param value 콤마가 포함된 문자형 숫자
 * @returns 숫자형
 * @example extractDigits(20,000) -> 20000
 */
export const extractDigits = (value: string) => value.replace(/[^\d]/g, "");
