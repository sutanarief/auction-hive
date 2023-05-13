'use client'

import { SafeItem, SafeUser } from "@/app/types";
import { Item } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EyeButton from "../EyeButton";
import Countdown from 'react-countdown';
import { MdOutlineHive } from "react-icons/md";
import Button from "../Button";
import { BsFillPersonFill } from "react-icons/bs";
import { FaFlagCheckered } from "react-icons/fa";
import Timer from "../Timer";
import useLoginModal from "@/app/hooks/useLoginModal";
import Avatar from "../Avatar";


type ItemCardProps = {
  data: SafeItem & {
    winner?: {
      username: string | null
    }
  }
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
}

const ItemCard:React.FC<ItemCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId,
  currentUser
}) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  return (
    <div
      onClick={() => router.push(`/items/${data.id}`)}
      className="
        col-span-1
        cursor-pointer
        group
      "
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
          "
        >
          <Image 
            fill
            alt='Auction Item'
            src={data.imageSrc}
            className="
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
            "
          />
          <div className="absolute top-3 right-3">
            <EyeButton 
              itemId={data.id}
              currentUser={currentUser}
            />
          </div>
          {!data.winnerId && (
            <div className="absolute top-3 left-3 flex flex-row">
              <div className={`p-1 text-xs text-white ${data.isActive ? "bg-green-500" : "bg-red-500"} rounded-l-lg`}>
                <BsFillPersonFill />
              </div>
              <div className="rounded-r-lg px-2 bg-neutral-700 flex items-center opacity-60 text-white text-xs font-extrabold">{data.bidderIds.length}</div>
            </div>
          )}
        </div>
        {data.isActive && (
          <>
            <div className="font-light text-neutral-700">
              <div className="flex flex-row items-center">
                Start Price: <MdOutlineHive className="ml-2" size={12}/>{data.initialPrice}
              </div>
              <div className="flex flex-row items-center">
                Buyout Price: <MdOutlineHive className="ml-2" size={12}/>{data.buyoutPrice}
              </div>
            </div>
            <div className="font-light text-neutral-700">
              <div className="flex flex-row items-center">
                Last Bid:
              </div>
              <div className="flex flex-row items-center">
                <strong className="font-semibold">{data.bids?.[data.bids.length - 1]?.user.username || ""}</strong> <MdOutlineHive className="ml-2" size={12}/>{data.bids?.[data.bids.length - 1]?.amount || 0}
              </div>
            </div>
            <Button 
              label="Bid"
              onClick={currentUser ? (() => router.push(`/items/${data.id}`)) : loginModal.onOpen}
              small
            />
          </>
        )}
        {data.winnerId ? (
          <div className="flex flex-col gap-8">
            <div className="text-sm">The auction has ended and the highest bid placed was <div className="inline-flex flex-row items-baseline text-base font-semibold"><MdOutlineHive className="ml-1" size={12}/>{data.bids?.[data.bids.length - 1].amount}</div>. Congratulations to the winning bidder!</div>
          <div
            className="
              flex
              flex-row
              items-center
              gap-2
            "
          >
            <div>Winner <strong>{data.winner?.username}</strong></div>
            <Avatar src={data.winner?.image}/>
          </div>
          </div>
        ) : (
          <div className="font-light text-neutral-500">
            <Timer 
              isActive={data.isActive}
              endDate={data.endDate}
              startDate={data.startDate}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemCard;