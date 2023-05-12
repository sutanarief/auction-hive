import { create } from "zustand";

type BidModal = {
  isOpen: boolean;
  itemName: string;
  lastBid: number;
  itemId: string;
  startPrice: number;
  buyoutPrice: number;
  onOpen: (itemName: string, lastBid: number, itemId: string, startPrice: number, buyoutPrice: number) => void;
  onClose: () => void;
}

const useBidModal = create<BidModal>((set) => ({
  isOpen: false,
  itemName: "",
  lastBid: 0,
  buyoutPrice: 0,
  itemId: "",
  startPrice: 0,
  onOpen: (itemName: string, lastBid: number, itemId: string, startPrice: number, buyoutPrice: number) => {
    set({ isOpen: true })
    set({ itemName })
    set({ lastBid })
    set({ itemId })
    set({ startPrice })
    set({ buyoutPrice })
  },
  onClose: () => set({ isOpen: false }),
}))

export default useBidModal;
