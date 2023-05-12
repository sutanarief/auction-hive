'use client'

import { SafeItem, SafeUser } from "@/app/types";
import { Item } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EyeButton from "../EyeButton";
import Countdown from 'react-countdown';
import { MdOutlineHive } from "react-icons/md";
import Button from "../Button";
import { BsCircleFill } from "react-icons/bs";
import Timer from "../Timer";


type ItemCardProps = {
  data: SafeItem;
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

  const formatDate = (date: string, time: string) => {
    const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let newDate = new Date(date)
    const offset = (newDate.getTimezoneOffset() + (7 * 60)) * 60000
    newDate.setTime(newDate.getTime() + offset)

    const day = newDate.getDate()
    const year = newDate.getFullYear()
    const month = newDate.getMonth()
    return time === 'start' ? `${monthsArr[month]} ${day}, ${year} at 10AM` : ``
  }

  const renderer = ({ days, hours, minutes, seconds, completed }:any ) => {
    const timeChecker = (value: any) => {
      return value < 10 ? `0${value}`: value
    }

    if (completed) {
      return null
    } else {
      return <span>{data.isActive ? 'Ends in - ': 'Starts in -'} {timeChecker(days)}:{timeChecker(hours)}:{timeChecker(minutes)}:{timeChecker(seconds)}</span>
    }
  }

  const addDate = (date: string, type: string) => {
    let result = new Date(date)

    if (type === 'start') {
      result.setHours(result.getHours() + 14)
    } else {
      result.setHours(result.getHours() - 14)
    }

    return result
  }

  console.log(data, 'ini data ni')

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
        </div>
        <div className="font-semibold text-lg flex-row flex items-center">
          {data.title} <BsCircleFill fill={data.isActive ? "green" : "red"} size={12} className="ml-1"/> 
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
                {data.bids?.[data.bids.length - 1]?.user.username || 0} <MdOutlineHive className="ml-2" size={12}/>{data.bids?.[data.bids.length - 1]?.amount || 0}
              </div>
            </div>
            <Button 
              label="Bid"
              onClick={() => {}}
              small
            />
          </>
        )}
        <div className="font-light text-neutral-500">
          <Timer 
            isActive={data.isActive}
            endDate={data.endDate}
            startDate={data.startDate}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemCard;