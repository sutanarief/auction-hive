'use client'

import useBuyoutModal from "@/app/hooks/useBuyoutModal";
import Modal from "./Modal";
import { MdOutlineHive } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BuyoutModal = () => {
  const buyoutModal = useBuyoutModal()
  const [isLoading, setIsLoading] = useState(false)

  const bodyContent = (
    <div>
      <div className="flex gap-2">Are you sure want to buy <strong>{buyoutModal.itemName}</strong> directly for <strong className="flex flex-row items-center"><MdOutlineHive size={12}/>{buyoutModal.buyoutPrice}</strong> ?</div>
    </div>
  )

  const onSubmit = () => {
    setIsLoading(true)

    axios.put(`/api/items/${buyoutModal.itemId}`)
      .then(() => {
        buyoutModal.onClose()
      })
      .catch(() => {
        toast.error("Something went wrong!")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Modal
      title="Buyout"
      body={bodyContent}
      disabled={isLoading}
      onClose={buyoutModal.onClose}
      isOpen={buyoutModal.isOpen}
      onSubmit={onSubmit}
      actionLabel="Buy it!"
      secondaryAction={buyoutModal.onClose}
      secondaryActionLabel="Maybe later"
    />
  );
}

export default BuyoutModal;