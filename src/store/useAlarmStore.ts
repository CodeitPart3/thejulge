import { create } from "zustand";

export type Alarm = {
  id: string;
  message: string;
  createdAt: string;
  read: boolean;
  status: "승인" | "거절";
};

interface AlarmStore {
  alarms: Alarm[];
  hasUnread: boolean;
  setAlarms: (alarms: Alarm[]) => void;
  markAllAsRead: () => void;
}

export const useAlarmStore = create<AlarmStore>((set, get) => ({
  alarms: [],
  hasUnread: false,
  setAlarms: (alarms) =>
    set({
      alarms,
      hasUnread: alarms.some((a) => !a.read),
    }),
  markAllAsRead: () => {
    const updated = get().alarms.map((a) => ({ ...a, read: true }));
    set({ alarms: updated, hasUnread: false });
  },
}));
