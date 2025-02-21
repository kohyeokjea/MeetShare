import { create } from "zustand";

const useCalMberInfoStore = create((set) => ({
  calMber: null,
  setCalMber: (member) => set({ calMber: member }),
}));

export default useCalMberInfoStore;
