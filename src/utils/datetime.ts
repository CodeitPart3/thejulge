//"YYYY-MM-DD" 형식의 한국식 날짜 문자열
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
//"HH:MM" 형식의 24시간제 시간 문자열로 변환
export function formatTime(d: Date): string {
  return d.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
// 시작 시간 + workhour 기준으로 endTime까지 포함한 시간 범위 문자열
export function formatTimeRange(startsAt: string, workhour: number): string {
  const start = new Date(startsAt);
  const end = new Date(start.getTime() + workhour * 3600000);
  return `${formatDate(start)} ${formatTime(start)}~${formatTime(end)} (${workhour}시간)`;
}
// 시작 시간과 종료 시간을 기준으로 과거 여부 판단
export function isPastDate(startsAt: string, workhour: number): boolean {
  const start = new Date(startsAt);
  const end = new Date(start.getTime() + workhour * 3600000);
  return end.getTime() < Date.now();
}
