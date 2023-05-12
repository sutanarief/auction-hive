'use client'

import React, { MouseEvent, ReactEventHandler, useState } from 'react';
import { IoTvSharp } from 'react-icons/io5'
import { FaPaintBrush } from 'react-icons/fa'
import { GiAmpleDress, GiCutDiamond } from 'react-icons/gi'
import { BsCarFrontFill, BsHouseFill } from 'react-icons/bs'
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

const Categories:React.FC<CategoriesProps> = () => {

  const [hoverItem, setHoverItem] = useState("")

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>, item: string) => {
    setHoverItem(item)
  }

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    setHoverItem("")
  }

  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()
  const isMainPage = pathname === '/'

  if(!isMainPage) {
    return null
  }
  
  return (

      <Container>
        <div
          className='
            pt-4
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto
          '
        >
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
    // <div
    //   className='
    //     flex-wrap
    //     flex
    //     mt-4
    //     font-semibold
    //     justify-center
    //     sm:flex-nowrap
    //   '
    // >
    //   {categories.map((item, index) => (
    //     <div 
    //       key={index}
    //       onMouseEnter={(e: MouseEvent<HTMLDivElement>) => handleMouseEnter(e, item)}
    //       onMouseLeave={handleMouseLeave}
    //       className={`
    //         cursor-pointer
    //         hover:border-b-[1px]
    //         border-b-black
    //         px-5
    //         py-1
    //         text-${hoverItem ? hoverItem === item.label ? "black" : "neutral-500" : "black"}
    //       `}
    //     >
    //       {item}
    //     </div>
    //   ))}
    // </div>
  )
}
export default Categories;