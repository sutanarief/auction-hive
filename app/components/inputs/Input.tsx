'use client'

import React, { useEffect, useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  watch: UseFormRegister<FieldValues>;
  errors: FieldErrors
};

const Input:React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  watch,
  required,
  register,
  errors
}) => {

  const hasValue = watch(id)

  return (
    <div className='w-full relative'>
      <input 
        id={id}
        disabled={disabled}
        { ...register(id, { required })}
        placeholder=' '
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6
          pl-4
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-yellow-400'}
        `}
      />
      <label
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          left-4
          z-10
          origin-[0]
          ${hasValue ? 'scale-75' : 'scale-100'}
          ${hasValue ? '-translate-y-4' : 'translate-y-0'}
          ${hasValue ? 'text-zinc-400' : 'text-black'}
          peer-focus:scale-75
          peer-focus:-translate-y-4
          peer-focus:text-zinc-400
          ${errors[id] ? 'text-rose-500' : 'text-black'}
        `}
      >
        {label}
      </label>
    </div>
  )
}
export default Input;