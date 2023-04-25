'use client';

import Image from 'next/image';
import React from 'react';

type AvatarProps = {
  
};

const Avatar:React.FC<AvatarProps> = () => {
  
  return (
    <Image 
      className='rounded-full bg-slate-600 w-8 h-8 object-cover'
      width='30'
      height='30'
      alt='Avatar'
      src='/images/ps5.jpg'
    />
  )
}
export default Avatar;