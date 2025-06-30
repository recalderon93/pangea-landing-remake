import { create } from "zustand";

export type HeaderStateType = {
  showMobileMenu: boolean;
  showSolutions: boolean;
  showMobileSolutions: boolean;
};

export type HeaderActionType = {
  actions: {
    openMobileMenu: () => void;
    openSolutions: () => void;
    openMobileSolutions: () => void;
    toggleMobileMenu: () => void;
    toggleSolutions: () => void;
    toggleMobileSolutions: () => void;
    closeMobileMenu: () => void;
    closeSolutions: () => void;
    closeMobileSolutions: () => void;
  };
};

export type HeaderStoreType = HeaderStateType & HeaderActionType;

export const useHeaderStore = create<HeaderStoreType>()((set) => ({
  showMobileMenu: false,
  showSolutions: false,
  showMobileSolutions: false,
  actions: {
    openMobileMenu: () => set({ showMobileMenu: true }),
    openSolutions: () => set({ showSolutions: true }),
    openMobileSolutions: () => set({ showMobileSolutions: true }),
    toggleMobileMenu: () =>
      set((state) => ({ showMobileMenu: !state.showMobileMenu })),
    toggleSolutions: () =>
      set((state) => ({ showSolutions: !state.showSolutions })),
    toggleMobileSolutions: () =>
      set((state) => ({ showMobileSolutions: !state.showMobileSolutions })),
    closeMobileMenu: () => set({ showMobileMenu: false }),
    closeSolutions: () => set({ showSolutions: false }),
    closeMobileSolutions: () => set({ showMobileSolutions: false }),
  },
}));

export const useHeaderActions = () => useHeaderStore((state) => state.actions);

export const useShowMobileMenu = () =>
  useHeaderStore((state) => state.showMobileMenu);

export const useShowSolutions = () =>
  useHeaderStore((state) => state.showSolutions);

export const useShowMobileSolutions = () =>
  useHeaderStore((state) => state.showMobileSolutions);
