'use client'

import useWatched from "../hooks/useWatched";
import { SafeUser } from "../types";
import { TbEye } from "react-icons/tb"

type EyeButtonProps = {
  itemId: string;
  currentUser?: SafeUser | null;
}


const EyeButton:React.FC<EyeButtonProps> = ({
  itemId,
  currentUser
}) => {
  const { hasWatched, toggleWatch } = useWatched({
    itemId,
    currentUser
  })
  
  return (
    <div
      onClick={toggleWatch}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <TbEye 
        size={28}
        color={`${hasWatched ? 'yellow' : 'white'}`}
        className={`
          absolute
          -top-[2px]
          -right-[2px]
        `}
      />
    </div>
  );
}

export default EyeButton;