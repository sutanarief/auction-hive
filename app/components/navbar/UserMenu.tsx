'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai'
import { MdOutlineHive } from 'react-icons/md'
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import Button from '../Button';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import useIsClickOut from '@/app/hooks/useClickOutside';

type UserMenuProps = {
  currentUser?: SafeUser | null
};

const UserMenu:React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [elementCallback] = useIsClickOut(setIsOpen)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])
  
  return (
    <div className={`relative ${currentUser ? "" : "w-[10vw]"}`}>
      <div className='flex flex-row items-center gap-3'>
        {currentUser ? (
          <div
            onClick={() => router.push('/balance')}
            className='
              block
              text-sm
              font-semibold
              py-3
              px-4
              rounded-full
              hover:bg-neutral-100
              transition
              cursor-pointer
            '
          >
            <div className='flex flex-row items-start'>
              <MdOutlineHive size={18}/>
              <span className='text-center self-center'>{currentUser.balance || 0}</span>
            </div>
          </div>
        ) : (
          <div
            className='
              hidden
              h-3/6
              w-full
              lg:block
              '
          >
            <Button label="Bid now !" onClick={loginModal.onOpen}/>
          </div>
        )}
        <div
          onClick={toggleOpen}
          className={`
            p-4
            lg:px-2
            lg:py-1
            border-[1px]
            border-neutral-200
            flex
            flex-row
            ${currentUser ? "" : "lg:hidden"}
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
            ${currentUser ? "" : "self-end"}
          `}
        >
          <AiOutlineMenu />
          {currentUser && (
            <div className='hidden lg:block'>
              <Avatar src={currentUser?.image}/>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div
          ref={elementCallback}
          className={`
            absolute
            rounded-xl
            shadow-md
            w-[30vw]
            sm:w-[20vw]
            lg:w-4/5
            bg-white
            overflow-hidden
            ${currentUser ? "right-0" : "right-12"}
            ${currentUser ? "top-12" : "top-14"}
            text-sm
          `}
        >
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                {/* <MenuItem onClick={() => router.push('/profile')} label='Profile'/> */}
                <MenuItem onClick={() => router.push('/balance')} label='Balance'/>
                <MenuItem onClick={() => router.push('/items/myitems')} label='My Items'/>
                <MenuItem onClick={() => router.push('/auctions')} label='Joined Auction'/>
                {/* <MenuItem onClick={() => router.push('/cart')} label='Cart'/> */}
                <hr/>
                <MenuItem onClick={() => signOut()} label='Logout'/>
              </>
            ) : (
              <>
                <MenuItem onClick={() => {
                  toggleOpen()
                  loginModal.onOpen()
                }} label='LogIn'/>
                <MenuItem onClick={() => {
                  toggleOpen()
                  registerModal.onOpen()
                }} label='Register'/>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default UserMenu;