'use client'

import { SafeBid } from "@/app/types";
import moment from "moment";
import { MdOutlineHive } from "react-icons/md";

type BidCardProps = {
  bid?: SafeBid & {
    user: {
      username: string | null
    }
  };
  userId?: string | null
}


const BidCard:React.FC<BidCardProps> = ({ bid, userId }) => {
  return (
    <div 
      className={`
        flex
        flex-col
        p-2
        w-4/5
        rounded-md
        ${userId === bid?.userId ? "bg-green-200" : "bg-yellow-200"}
        ${userId === bid?.userId ? "text-green-800" : "text-yellow-800"}
        ${userId === bid?.userId ? "self-start" : "self-end"}
    `}
    >
      <div className="text-sm"><strong className="flex flex-row items-center"><MdOutlineHive size={10} />{bid?.amount}</strong> by {bid?.user.username}</div>
      <div className="text-xs font-light text-neutral-500 self-end">{moment(bid?.createdAt).calendar()}</div>
    </div>
  );
}

export default BidCard;