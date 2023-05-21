import { create } from "zustand";

type BidModal = {
  isOpen: boolean;
  itemName: string;
  lastBid: number;
  itemId: string;
  startPrice: number;
  buyoutPrice: number;
  lastUserBid: string;
  onOpen: (itemName: string, lastBid: number, itemId: string, startPrice: number, buyoutPrice: number, lastUserBid: string) => void;
  onClose: () => void;
}

const useBidModal = create<BidModal>((set) => ({
  isOpen: false,
  itemName: "",
  lastBid: 0,
  buyoutPrice: 0,
  itemId: "",
  startPrice: 0,
  lastUserBid: "",
  onOpen: (itemName: string, lastBid: number, itemId: string, startPrice: number, buyoutPrice: number, lastUserBid: string) => {
    set({ isOpen: true })
    set({ itemName })
    set({ lastBid })
    set({ itemId })
    set({ startPrice })
    set({ buyoutPrice })
    set({ lastUserBid })
  },
  onClose: () => {
    set({ isOpen: false })
    set({ itemName: "" })
    set({ lastBid: 0 })
    set({ itemId: "" })
    set({ startPrice: 0 })
    set({ buyoutPrice: 0 })
    set({ lastUserBid: "" })
  },
}))

export default useBidModal;
