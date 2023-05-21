import { create } from "zustand";
import { SafeItem } from "../types";

type ItemModalStore = {
  isOpen: boolean;
  onOpen: (data?: SafeItem, action?: string) => void;
  onClose: () => void;
  item: SafeItem
  action?: string | null
}

const useItemModal = create<ItemModalStore>((set) => ({
  isOpen: false,
  action: null,
  item: {
    id: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    isActive: false,
    category: "",
    imageSrc: "",
    buyoutPrice: 0,
    initialPrice: 0,
    isEnded: false,
    createdAt: "",
    updatedAt: "",
    userId: "",
    userIds: [""],
    winnerId: "",
    winner: {
      username: "",
      image: ""
    },
    owner: {
      username: "",
      image: ""
    },
    bidId: "",
    bidderIds: [""]
  },
  onOpen: (data?: SafeItem, action?: string) => {
    set({ isOpen: true })
    set({ item: data })
    set({ action })
  },
  onClose: () => {
    set({ isOpen: false })
    set({ action: null })
    set({ item: {
      id: "",
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      isActive: false,
      category: "",
      imageSrc: "",
      buyoutPrice: 0,
      initialPrice: 0,
      isEnded: false,
      createdAt: "",
      updatedAt: "",
      userId: "",
      userIds: [""],
      winnerId: "",
      winner: {
        username: "",
        image: ""
      },
      owner: {
        username: "",
        image: ""
      },
      bidId: "",
      bidderIds: [""]
    }})
  }
}))

export default useItemModal;
