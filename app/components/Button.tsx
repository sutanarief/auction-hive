'use client';

import React from 'react';
import { IconType } from 'react-icons';

type ButtonProps = {
  label: string;
  htmlLabel?: React.ReactElement
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

const Button:React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  htmlLabel
}) => {
  console.log(onClick, 'ini onClick')
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        text-gray-800
        font-semibold
        ${outline ? 'bg-white' : 'bg-yellow-400'}
        ${outline ? 'border-black' : 'border-yellow-400'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {Icon && (
        <Icon 
          size={24}
          className='
            absolute
            left-4
            top-3
          '
        />
      )}
      {htmlLabel ? htmlLabel : label}
    </button>
  )
}
export default Button;