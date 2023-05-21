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
import { BiTrash } from "react-icons/bi"
import { RiEditLine } from "react-icons/ri"
import Timer from "../Timer";
import useLoginModal from "@/app/hooks/useLoginModal";
import Avatar from "../Avatar";
import IconButton from "../IconButton";
import Swal from "sweetalert2";
import axios from "axios"
import { toast } from "react-hot-toast";
import { useCallback } from "react";
import useItemModal from "@/app/hooks/useItemModal";



type UserItemCardProps = {
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

const UserItemCard:React.FC<UserItemCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId,
  currentUser
}) => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const itemModal = useItemModal()

  const handleEdit = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    itemModal.onOpen(data, "edit")
  }, [data, itemModal])
  
  const handleDelete = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    Swal.fire({
      title: `Are you sure want to delete ${data.title}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          try {
            const response = await axios.delete(`/api/items/${data.id}`);
          } catch {
            toast.error("Something went wrong");
          }
        } finally {
          router.refresh();
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("Successfully delete the item");
      }
    })
  }, [data.id, data.title, router])

  const handleStartNow = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    data.startNow = true

    Swal.fire({
      title: `Are you sure want to start ${data.title} auction right now for ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Yes, start it!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          try {
            const response = await axios.put(`/api/items/${data.id}`, data);
          } catch {
            toast.error("Something went wrong");
          }
        } finally {
          router.refresh();
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("The auction started!");
      }
    })

  },[data, router])

  const htmlLabel = (
    <div>Start now for <div className="inline-flex flex-row items-baseline text-base font-semibold"><MdOutlineHive className="ml-1" size={12}/>10</div></div>
  )

  return (
    <div
      className="
        col-span-1
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
            cursor-pointer
          "
        >
          <Image 
            fill
            onClick={() => router.push(`/items/${data.id}`)}
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
        <div className="font-semibold cursor-pointer text-lg flex-row flex items-center"  onClick={() => router.push(`/items/${data.id}`)}>
          {data.title}
        </div>
        {!data.winnerId && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Button 
                label="View"
                small
                onClick={() => router.push(`/items/${data.id}`)}
              />
              {!data.isActive && (
                <>
                  <IconButton
                    action="edit" 
                    onClick={handleEdit}
                    disabled={false}
                    icon={RiEditLine}
                  />
                  <IconButton
                    action="delete" 
                    onClick={handleDelete}
                    disabled={false}
                    icon={BiTrash}
                  />
                </>
              )}
            </div>
            {!data.isActive && (
              <Button
                label="Start Now"
                htmlLabel={htmlLabel}
                small
                onClick={handleStartNow}
              />
            )}
          </div>
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

export default UserItemCard;