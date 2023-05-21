'use client'

import { TiPlus } from "react-icons/ti";
import Button from "./Button";
import useItemModal from "../hooks/useItemModal";

const RegisterItemCard = () => {
  const itemModal = useItemModal()

  return (

    <div className="flex flex-col items-center justify-center gap-4">
    <div
      className="
        text-4xl
        bg-yellow-400
        font-extrabold
        rounded-full
        text-white
        hidden
        sm:flex
        justify-center
        items-center
        hover:opacity-80
      "
    >
      <div
        onClick={itemModal.onOpen}
        className='
          p-2
          bg-yellow-400
          rounded-full
          text-white
          cursor-pointer
        '
      >
        <TiPlus size={28} />
      </div>
    </div>
    <div
        className="
          hidden
          sm:flex
          items-center
          justify-center
          w-full
          text-center
        "
      >
        <div>Click on &ldquo;+&rdquo; Button to register new item</div>
      </div>
    <div
      className="
        flex
        sm:hidden
        w-full
      "
    >
      <Button 
        label="Register an Item"
        onClick={itemModal.onOpen}
        small
      />
    </div>
  </div>
  );
}
 
export default RegisterItemCard;