import { create } from "zustand";

type BidInfoModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBidInfoModal = create<BidInfoModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useBidInfoModal;
