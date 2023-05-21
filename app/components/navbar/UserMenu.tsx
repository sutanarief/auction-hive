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
import { SafeBid, SafeHistory, SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import useIsClickOut from '@/app/hooks/useClickOutside';

type UserMenuProps = {
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

const UserMenu:React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [elementCallback] = useIsClickOut(setIsOpen)
  
  const highestBids: SafeBid[] | undefined = currentUser?.bids?.reduce((acc: SafeBid[], bid: SafeBid) => {
    const existingBid = acc.find((b: SafeBid) => b.itemId === bid.itemId);
    if (!existingBid || bid.amount > existingBid.amount) {
      acc = acc.filter((b: SafeBid) => b.itemId !== bid.itemId);
      if(bid.isActive) {
        acc.push(bid);
      }
    }
    return acc; 
  }, []);

  const calculateUsed = (totalBid: SafeBid[]) => {
    let total = totalBid.map((item) => {
      if(item.action === 'Bid' && !item.item.isEnded) {
        return item
      }
    }).reduce((acc, current) => acc + (current?.amount || 0), 0)

    return total
  }

  const formatBalance = (balance: number) => {
    const reversed = balance.toString().split('').reverse();
    const chunks = [];
  
    while (reversed.length) {
      chunks.push(reversed.splice(0, 3));
    }
  
    const formatted = chunks.map(chunk => chunk.join('')).join(',');
    return formatted.split('').reverse().join('');
  }

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])
  
  return (
    <div className={`relative ${currentUser ? "" : "w-[10vw]"}`}>
      <div className='flex flex-row items-center gap-3'>
        {currentUser ? (
          <div
            onClick={() => router.push(`/balance/${currentUser.id}`)}
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
              <span className='text-center self-center'>{formatBalance((currentUser?.balance || 0) - calculateUsed(highestBids || []))}</span>
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
                <MenuItem onClick={() => router.push(`/balance/${currentUser.id}`)} label='Balance'/>
                <MenuItem onClick={() => router.push(`/items/myitems/${currentUser.id}`)} label='My Items'/>
                <MenuItem onClick={() => router.push('/items/watched')} label='Watched Items'/>
                <MenuItem onClick={() => router.push('/auctions')} label='Joined Auction'/>
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