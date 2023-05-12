'use client';

import React from 'react';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import { SafeUser } from '@/app/types';
import Categories from './Categories';

type NavbarProps = {
  currentUser?: SafeUser | null;
};

const Navbar:React.FC<NavbarProps> = ({ currentUser }) => {
  
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
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
          <Categories />
    </div>
  )
}
export default Navbar;