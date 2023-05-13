'use client'

import { SafeBid, SafeItem, SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import EyeButton from "../EyeButton";
import { IconType } from "react-icons";
import ItemInfo from "./ItemInfo";
import Timer from "../Timer";
import ItemCategory from "./ItemCategory";
import { Bid } from "@prisma/client";

type ItemHeadProps = {
  bids?: SafeBid[]
  item: SafeItem & {
    owner: {
      username: string | null,
      image: string | null
    },
    winner?: {
      username: string | null,
      image: string | null
    } | null | undefined,
    bids?: SafeBid[]
  };
  currentUser?: SafeUser | null;
  category: {
    icon: IconType;
    label: string;
    description: string;
  } | undefined
}

const ItemHead:React.FC<ItemHeadProps> = ({
  item,
  currentUser,
  category,
  bids
}) => {
  const {
    title,
    isActive,
    owner,
    imageSrc,
    id,
    startDate,
    endDate,
    description,
    bids: itemBids,
    winnerId
  } = item

  return (
    <>
    <Heading
      title={title}
      subtitle={description}
    />
    {category && (
      <ItemCategory 
        icon={category.icon}
        label={category.label}
        description={category.description}
      />
    )}
    <div className="font-light text-neutral-500">
      {!winnerId && (
        <Timer
          isActive={isActive}
          startDate={startDate}
          endDate={endDate}
        />
      )}
    </div>
    <div
      className="
        flex
        flex-col
        lg:flex-row
        2xl:flex-col
        gap-8
      "
    >
      <div
        className="
          w-full
          lg:w-3/5
          2xl:w-full
          h-[60vh]
          overflow-hidden
          rounded-xl
          relative
        "
      >
        <Image 
          alt="Image"
          fill
          className="object-cover w-full" 
          src={imageSrc}
          />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <EyeButton 
            itemId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
      <div
        className="
          grid
          grid-cols-1
          h-[60vh]
          md:grid-cols-7
          md:gap-10
          w-full
          lg:w-2/5
          2xl:w-full
        "
      >
        <ItemInfo 
          category={category}
          item={item}
          bids={bids}
        />
      </div>
    </div>
    </>
  );
}

export default ItemHead;