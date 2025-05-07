export interface Breakpoints {
  largeDesktop: number;
  desktop: number;
  laptop: number;
  tablet: number;
  mobile: number;
}

export type DeviceType = keyof Breakpoints;

export const BREAKPOINT: Breakpoints = {
  largeDesktop: 1280,
  desktop: 1024,
  laptop: 768,
  tablet: 640,
  mobile: 0,
};

export function getDeviceType(width: number): DeviceType {
  const entries = Object.entries(BREAKPOINT) as [DeviceType, number][];
  const sorted = entries.sort((a, b) => b[1] - a[1]);

  for (const [type, minWidth] of sorted) {
    if (width >= minWidth) return type;
  }

  return "mobile"; // fallback
}
