'use client';

import React from 'react';
import { IconType } from 'react-icons';
import { SafeItem } from '../types';

type IconButton = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon: IconType;
  action: string;
};

const IconButton:React.FC<IconButton> = ({
  onClick,
  disabled,
  icon: Icon,
  action
}) => {
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        w-fit
        transition
        text-white
        py-1
        px-2
        ${action === "edit" ? 'bg-blue-400' : "bg-red-400"}
      `}

      // ${false ? 'bg-white' : 'bg-yellow-400'}
      // ${false ? 'border-black' : 'border-yellow-400'}
      // ${false ? 'py-1' : 'py-3'}
      // ${false ? 'text-sm' : 'text-md'}
      // ${false ? 'font-light' : 'font-semibold'}
      // ${false ? 'border-[1px]' : 'border-2'}
    >
      <Icon 
        size={20}
        className='
        '
      />
    </button>
  )
}
export default IconButton;