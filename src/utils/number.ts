/**
 * 숫자를 전달받아 콤마(,)를 더해 반환합니다.
 * @example numberCommaFormatter(20000) -> 20,000
 */
export const numberCommaFormatter = Intl.NumberFormat("ko-kr", {
  compactDisplay: "long",
}).format;
