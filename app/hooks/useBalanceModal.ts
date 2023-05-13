import { create } from "zustand";

type BalanceModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBalanceModal = create<BalanceModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useBalanceModal;
