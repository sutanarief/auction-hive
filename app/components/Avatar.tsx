'use client';

import Image from 'next/image';
import React from 'react';

type AvatarProps = {
  src?: string | null | undefined
};

const Avatar:React.FC<AvatarProps> = ({ src }) => {
  
  return (
    <Image 
      className='rounded-full bg-slate-600 w-8 h-8 object-cover'
      width='30'
      height='30'
      alt='Avatar'
      src={src || `/images/placeholder.jpg`}
    />
  )
}
export default Avatar;