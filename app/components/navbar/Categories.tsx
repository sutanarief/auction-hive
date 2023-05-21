'use client'

import React, { MouseEvent, ReactEventHandler, useState } from 'react';
import { IoTvSharp } from 'react-icons/io5'
import { FaPaintBrush, FaFlagCheckered } from 'react-icons/fa'
import { GiAmpleDress, GiCutDiamond } from 'react-icons/gi'
import { BsCarFrontFill, BsHouseFill, BsClockFill, BsFillCalendar2EventFill } from 'react-icons/bs'
import { MdOutlineSmartToy, MdSportsFootball } from 'react-icons/md'
import Container from '../Container';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

type CategoriesProps = {
  
};

export const categories = [
  {
  label: "Electronics",
  icon: IoTvSharp,
  description: "This category includes the latest gadgets and electronics, including smartphones, laptops, smartwatches, and gaming consoles"
  },
  {
  label: "Automotive",
  icon: BsCarFrontFill,
  description: "This category includes cars, trucks, motorcycles, and other vehicles, as well as parts and accessories."
  },
  {
  label: "Home",
  icon: BsHouseFill,
  description: "his category includes a range of items for the home, including furniture, appliances, decor, and gardening tools"
  },
  {
  label: "Art",
  icon: FaPaintBrush,
  description: "This category includes rare and valuable items such as paintings, sculptures, antiques, and collectibles."
  },
  {
  label: "Toys",
  icon: MdOutlineSmartToy,
  description: "This category includes a wide range of toys, games, and hobbies, including board games, action figures, model kits, and puzzles."
  },
  {
  label: "Sports",
  icon: MdSportsFootball,
  description: "This category includes equipment and gear for various sports and fitness activities, such as golf clubs, bicycles, gym equipment, and athletic wear."
  },
  {
  label: "Fashion",
  icon: GiAmpleDress,
  description: "This category includes high-end designer clothing, jewelry, watches, and accessories for men and women."
  },
  {
  label: "Jewelery",
  icon: GiCutDiamond,
  description: "This category includes high-end jewelry and watches from top brands, such as diamond rings, luxury watches, and antique pieces."
  },
]

const mainState = [
  {
  label: "Active",
  icon: BsClockFill,
  description: "This category includes the latest gadgets and electronics, including smartphones, laptops, smartwatches, and gaming consoles"
  },
  {
  label: "Upcoming",
  icon: BsFillCalendar2EventFill,
  description: "This category includes the latest gadgets and electronics, including smartphones, laptops, smartwatches, and gaming consoles"
  },
  {
  label: "Finished",
  icon: FaFlagCheckered,
  description: "This category includes the latest gadgets and electronics, including smartphones, laptops, smartwatches, and gaming consoles"
  },
]

const Categories:React.FC<CategoriesProps> = () => {

  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()
  const isMainPage = pathname === '/' || pathname?.includes("myitems") || pathname?.includes("watched")

  if(!isMainPage) {
    return null
  }
  
  return (
    <>
      <Container>
        <div
          className='
            pt-2
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto
          '
        >
          {mainState.map((item) => (
              <CategoryBox 
              key={item.label}
              label={item.label}
              description={item.description}
              selected={category === item.label}
              icon={item.icon}
            />
          ))}
          {categories.map((item) => (
            <CategoryBox 
              key={item.label}
              label={item.label}
              description={item.description}
              selected={category === item.label}
              icon={item.icon}
            />
          ))}
        </div>
      </Container>
    </>
  )
}
export default Categories;