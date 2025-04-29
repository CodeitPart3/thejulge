/**
 * 시급 인상률 계산 유틸리티
 * @param hourlyPay 현재 시급
 * @param originalPay 기존 시급
 * @returns { rawRate, displayRate, rateText }
 */
export const getPayRateText = (
  hourlyPay?: number,
  originalPay?: number,
): {
  rawRate: number;
  displayRate: number;
  rateText: string;
} => {
  if (hourlyPay === undefined || originalPay === undefined) {
    return {
      rawRate: 0,
      displayRate: 0,
      rateText: "",
    };
  }

  const rawRate = ((hourlyPay - originalPay) / originalPay) * 100;
  const displayRate = Math.min(Math.round(rawRate), 100);
  const rateText = `기존 시급보다 ${displayRate}%`;

  return { rawRate, displayRate, rateText };
};
