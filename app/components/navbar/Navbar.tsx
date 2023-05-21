'use client';

import React from 'react';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import { SafeBid, SafeUser } from '@/app/types';
import Categories from './Categories';
import { useRouter } from 'next/navigation';

type NavbarProps = {
  currentUser?: SafeUser & {
    bids: (SafeBid & {
      action: string
      createdAt: string
      item: {
        isEnded: boolean
        id: string
        title: string
      },
      user: {
        username: string | null
      }
    })[]
  } | null;
};

const Navbar:React.FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter()
  return (
    <div className='fixed w-full bg-gray-50 z-10 shadow-sm'>
      <div
        className='py-4 border-b-[1px]'
      >
        <Container>
          <div
            className='
              flex
              flex-row
              items-center
              justify-between
              gap-3
              lg:gap-0
            '
          >
            <Logo />
            <Search />
            <div
              onClick={() => router.push('/')}
              className='
                cursor-pointer
                font-semibold
                hover:border-b-[2px]
                pb-1
                
              '
            >
              Home
            </div>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
          <Categories />
    </div>
  )
}
export default Navbar;