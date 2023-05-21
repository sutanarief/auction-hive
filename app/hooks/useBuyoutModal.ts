import { create } from "zustand";

type BuyoutModal = {
  isOpen: boolean;
  itemName: string;
  buyoutPrice: number;
  itemId: string;
  onOpen: (itemName: string, buyoutPrice: number, itemId: string) => void;
  onClose: () => void;
}

const useBuyoutModal = create<BuyoutModal>((set) => ({
  isOpen: false,
  itemName: "",
  buyoutPrice: 0,
  itemId: "",
  onOpen: (itemName: string, buyoutPrice: number, itemId: string) => {
    set({ isOpen: true })
    set({ itemName })
    set({ buyoutPrice })
    set({ itemId })
  },
  onClose: () => {
    set({ isOpen: false })
    set({ itemName: "" })
    set({ buyoutPrice: 0 })
    set({ itemId: "" })
  }
}))

export default useBuyoutModal;
