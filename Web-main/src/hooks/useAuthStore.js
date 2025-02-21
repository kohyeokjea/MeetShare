import { create } from "zustand";

// 로그인 상태 관리 store
export const useAuthStore = create((set) => ({
  loginFlag: false,
  setLoginFlag: (flag) => set({ loginFlag: flag }),
}));
