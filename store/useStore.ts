import { create } from "zustand";

type NicheFilter = string;

interface AppState {
  nicheFilter: NicheFilter;
  setNicheFilter: (n: NicheFilter) => void;
  productSearch: string;
  setProductSearch: (s: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
}

export const useStore = create<AppState>((set) => ({
  nicheFilter: "",
  setNicheFilter: (nicheFilter) => set({ nicheFilter }),
  productSearch: "",
  setProductSearch: (productSearch) => set({ productSearch }),
  sortBy: "newest",
  setSortBy: (sortBy) => set({ sortBy }),
}));
