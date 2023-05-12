'use client'

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";
import { SafeUser } from "../types";
import { useCallback } from "react";
import useLoginModal from "../hooks/useLoginModal";
import useItemModal from "../hooks/useItemModal";

type EmptyStateProps = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  label?: string;
  currentUser?: SafeUser | null;
};

const EmptyState:React.FC<EmptyStateProps> = ({
  title = "Be the first to sell in this category, register your item now!",
  subtitle = "We're sorry, but we don't have any items in this category right now. Please select another category or come back at a later time.",
  label="Register Your Item Now",
  showReset,
  currentUser
}) => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const itemModal = useItemModal()

  const onClick = useCallback(() => {
    if(currentUser || window.location.pathname.includes('myitems')) {
      return itemModal.onOpen()
    }

    return loginModal.onOpen()
  }, [currentUser, loginModal, itemModal])
  
  return (
    <div
      className="
        h-[60vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            label={label}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  )
}
export default EmptyState;