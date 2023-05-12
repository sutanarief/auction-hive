'use client'

import React from 'react';
import { BiSearch } from 'react-icons/bi'
type SearchProps = {
  
};

const Search:React.FC<SearchProps> = () => {
  
  return (
    <div
      className='
        border-[1px]
        w-full
        sm:w-full
        lg:w-7/12
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
      '
    >
      <div
        className='
          flex
          flex-row
          items-center
          justify-between
        '
      >
        <div
          className='
            text-sm
            pl-6
            w-full
            pr-2
            text-gray-600
            flex
            flex-row
            items-center
            gap-3
            justify-end
            sm:justify-between
          '
        >
          <div className="hidden sm:block">Search Items</div>
          <div
            className='
              p-2
              bg-yellow-400
              rounded-full
              text-white
            '
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Search;