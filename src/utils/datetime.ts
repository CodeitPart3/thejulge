const ONE_SECOND_UNIT_MS = 1_000;
const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_MONTH = ONE_DAY * 30;
const ONE_YEAR = ONE_DAY * 365;
const ONE_HOUR_MS = 3_600_000;

/**
 * "YYYY-MM-DD" 형식의 한국식 날짜 문자열을 반환
 * @param d - Date 객체
 */
export function formatDate(d: Date): string {
  return d
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\.\s?/g, "-")
    .slice(0, 10);
}

/**
 * "HH:MM" 형식의 24시간제 시간 문자열을 반환
 * @param d - Date 객체
 */
export function formatTime(d: Date): string {
  return d.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * "YYYY-MM-DD HH:MM~HH:MM (N시간)" 형식의 시간 범위 문자열을 반환
 * @param startsAt - ISO 8601 형식의 날짜 문자열
 * @param workhour - 근무 시간 (시간 단위)
 */
export function formatTimeRange(startsAt: string, workhour: number): string {
  const start = new Date(startsAt);
  const end = new Date(start.getTime() + workhour * ONE_HOUR_MS);

  return `${formatDate(start)} ${formatTime(start)}~${formatTime(end)} (${workhour}시간)`;
}

/**
 * 해당 공고가 과거에 종료되었는지를 판단
 * @param startsAt - ISO 8601 형식의 날짜 문자열
 * @param workhour - 근무 시간 (시간 단위)
 */
export function isPastDate(startsAt: string, workhour: number): boolean {
  const start = new Date(startsAt);
  const end = new Date(start.getTime() + workhour * ONE_HOUR_MS);
  return end.getTime() < Date.now();
}

export const getRelativeTimeFromNow = (input: string | Date): string => {
  const date = new Date(input);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const diffInSeconds = Math.floor(diff / ONE_SECOND_UNIT_MS);

  const rtf = new Intl.RelativeTimeFormat("ko-KR", { numeric: "auto" });

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", diffInSeconds / ONE_YEAR],
    ["month", diffInSeconds / ONE_MONTH],
    ["day", diffInSeconds / ONE_DAY],
    ["hour", diffInSeconds / ONE_HOUR],
    ["minute", diffInSeconds / ONE_MINUTE],
    ["second", diffInSeconds],
  ];

  for (const [unit, value] of units) {
    const rounded = Math.round(value);
    if (Math.abs(rounded) >= 1) {
      return rtf.format(rounded, unit);
    }
  }

  return "방금 전";
};

export const getUTCDateFromLocaleTime = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth();
  const dd = date.getDate();

  const utcDate = new Date(Date.UTC(yyyy, mm, dd, 0, 0, 0));
  return utcDate.toISOString();
};
