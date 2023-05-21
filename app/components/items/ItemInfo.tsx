'use client'

import { SafeBid, SafeItem, SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import { TbEye } from "react-icons/tb"; 
import { RiAuctionLine } from "react-icons/ri"; 
import Avatar from "../Avatar";
import ItemCategory from "./ItemCategory";
import { MdOutlineHive } from "react-icons/md";
import Button from "../Button";
import useBidInfoModal from "@/app/hooks/useBidInfoModal";
import useBidModal from "@/app/hooks/useBidModal";
import BidCard from "../bids/BidCard";
import useBuyoutModal from "@/app/hooks/useBuyoutModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";

type ItemInfoProps = {
  item: SafeItem & {
    owner: {
      username: string | null
      image: string | null
    },
    winner?: {
      username: string | null
      image: string | null
    } | null | undefined,
    bids?: SafeBid[]
  };
  category: {
    icon: IconType;
    label: string;
    description: string;
  } | undefined
  bids?: SafeBid[]
  currentUser?: SafeUser | null
}

const ItemInfo:React.FC<ItemInfoProps> = ({
  item,
  category,
  bids,
  currentUser
}) => {
  const infoModal = useBidInfoModal()
  const bidModal = useBidModal()
  const buyoutModal = useBuyoutModal()
  const loginModal = useLoginModal()
  const incrementValue = (lastBid: number) => {
    switch (true) {
      case lastBid <= 50:
        return 1
      case lastBid >= 51 && lastBid <= 100:
        return 2
      case lastBid >= 101 && lastBid <= 200:
        return 5
      case lastBid >= 201 && lastBid <= 500:
        return 10
      case lastBid >= 501 && lastBid <= 2000 :
        return 25
      case lastBid >= 2001 && lastBid <= 5000 :
        return 100
      case lastBid >= 5001 && lastBid <= 10000 :
        return 250
      case lastBid >= 10001 && lastBid <= 30000 :
        return 500
      case lastBid >= 30001 && lastBid <= 50000 :
        return 2000
      case lastBid >= 50001 && lastBid <= 500000:
        return 5000
      case lastBid >= 500001 && lastBid <= 2500000:
        return 10000
      default:
        return 50000
    }
  }

  return (
    <div className="col-span-7 flex flex-col gap-4" >
      <div className=" flex flex-col gap-4" >
        <div
          className="
            text-xl
            flex
            flex-row
            items-center
            gap-2
          "
        >
          <div>Registered by <strong>{item.owner.username}</strong></div>
          <Avatar src={item.owner?.image}/>
        </div>
        <div
          className="
            flex
            flex-row
            items-center
            text-neutral-500
          "
        >
          <div className="flex flex-col py-2 px-3 items-center border-r-[1px] border-r-neutral-600">
            <div className="mb-1">
              <TbEye size={16} />
            </div>
            <div>
              <strong className="mr-1">{item.userIds.length}</strong> watching
            </div>
          </div>
          <div className="flex flex-col py-2 px-3 items-center">
            <div className="mb-1">
              <RiAuctionLine size={16} />
            </div>
            <hr />
            <div>
              <strong className="mr-1">{item.bidderIds.length}</strong> participant{`${item.bidderIds.length > 1 ? 's' : ''}`}
            </div>
          </div>
        </div>
      </div>
      <div
        className="
          flex
          flex-col
          gap-2
        "
      >
        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-3
          "
        >
          <div className="flex flex-col gap-2 w-full sm:w-2/5">
            <div className="text-xl"><strong>Info</strong></div>
            <div className="flex flex-row items-center">Start Price: <MdOutlineHive className="ml-2" size={12}/>{item.initialPrice}</div>
            {!item.winnerId && (
              <div className="flex flex-row flex-wrap items-center gap-1"><span className="mr-2">Minimum Bid: </span><span className="flex flex-row items-center"><MdOutlineHive size={12}/>{(item.bids?.[item.bids.length - 1]?.amount || item.initialPrice) + incrementValue(item.bids?.[item.bids.length - 1]?.amount || 0)}</span></div>
            )}
            <div className="flex flex-row flex-wrap items-center gap-1"><span className="mr-2">Buyout Price: </span><span className="flex flex-row items-center"><MdOutlineHive size={12}/>{item.buyoutPrice}</span></div>
            <div className="flex flex-row items-center">{item.winnerId ? "Sold for:" : "Last Bid:"} <MdOutlineHive className="ml-2" size={12}/>{item.bids?.[item.bids.length - 1]?.amount || 0}</div>
          </div>
          <div className="sm:border-l-[1px] border-l-neutral-600 flex flex-col w-full sm:w-3/5">
            <div className="text-xl sm:ml-2"><strong>Bid History</strong></div>
            <div className="sm:ml-2 w-full h-40 gap-3 flex p-3 flex-col overflow-y-scroll">
              {bids?.map((bid) => (
                <BidCard
                  key={bid.id}
                  bid={bid}
                  userId={currentUser?.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {item.winnerId ? (
        <div
        className="
          flex
          flex-row
          items-center
          gap-2
          text-xl
          mt-4
        "
      >
        <div>Auction winner: <strong>{item.winner?.username || "-"}</strong></div>
        {item.winnerId && (
          <Avatar src={item.winner?.image}/>
        )}
      </div>
      ) : (
        <div className="flex flex-col">
          <div
            className="cursor-pointer text-blue-700"
            onClick={infoModal.onOpen}
            >
              Bid Info ?
          </div>
          {item.isActive && (
            <div className="flex flex-row gap-4">
              <Button
                label="Bid"
                onClick={() => {
                  if (item.userId === currentUser?.id) {
                    return toast.error("You cannot bid on your item", {
                      position: "bottom-center"
                    })
                  }
                  currentUser ? bidModal.onOpen(item.title, item.bids?.[item.bids.length - 1]?.amount || 0, item.id, item.initialPrice, item.buyoutPrice, item.bids?.[item.bids.length - 1]?.user.username || "") : loginModal.onOpen()
                }}
              />
              <Button
                label="Buyout"
                outline
                onClick={currentUser ? (() => buyoutModal.onOpen(item.title, item.buyoutPrice, item.id)) : loginModal.onOpen}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ItemInfo;