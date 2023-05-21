'use client'

import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import qs from 'query-string'

type CategoryBoxProps = {
  icon: IconType
  label: string
  description: string
  selected?: boolean
};

const CategoryBox:React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  description,
  selected
}) => {

  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl({
      url: pathname?.includes('myitems') || pathname?.includes('watched') ? `${pathname}/` : '/',
      query: updatedQuery
    }, { skipNull: true })

    router.push(url)
  }, [label, params, router, pathname])
  
  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        px-3
        py-2
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className='font-meduim text-sm'>
        {label}
      </div>
    </div>
  )
}
export default CategoryBox;