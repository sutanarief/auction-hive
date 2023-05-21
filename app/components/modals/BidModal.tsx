'use client'

import useBidModal from "@/app/hooks/useBidModal";
import Modal from "./Modal";
import Heading from "../Heading";
import { MdOutlineHive } from "react-icons/md";
import Button from "../Button";
import Input from "../inputs/Input";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SafeUser } from "@/app/types";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type BidModalProps = {
  currentUser?: SafeUser | null
}

const BidModal:React.FC<BidModalProps> = ({ currentUser }) => {
  const bidModalHook = useBidModal()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      amount: '',
    }
  })



  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const calculateBid = (multiplier: number, lastBid: number, startPrice: number) => {
    if(lastBid === 0) {
       return startPrice + (multiplier * incrementValue(lastBid))
    }

    let result = lastBid + (multiplier * incrementValue(lastBid))

    if(result >= bidModalHook.buyoutPrice) {
      return bidModalHook.buyoutPrice
    }


    return result
  }

  const incrementValue = (startPrice: number) => {
    switch (true) {
      case startPrice <= 50:
        return 1
      case startPrice >= 51 && startPrice <= 100:
        return 2
      case startPrice >= 101 && startPrice <= 200:
        return 5
      case startPrice >= 201 && startPrice <= 500:
        return 10
      case startPrice >= 501 && startPrice <= 2000 :
        return 25
      case startPrice >= 2001 && startPrice <= 5000 :
        return 100
      case startPrice >= 5001 && startPrice <= 10000 :
        return 250
      case startPrice >= 10001 && startPrice <= 30000 :
        return 500
      case startPrice >= 30001 && startPrice <= 50000 :
        return 2000
      case startPrice >= 50001 && startPrice <= 500000:
        return 5000
      case startPrice >= 500001 && startPrice <= 2500000:
        return 10000
      default:
        return 50000
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    
    if(data.amount >= bidModalHook.buyoutPrice) {
      toast.error('Sorry, your bid has exceeded the buyout price. Please select the "Buyout" option beside the bid button if you wish to purchase the item.', {
        position: 'bottom-center'
      })
      return setIsLoading(false)
    }

    if(bidModalHook.lastUserBid === currentUser?.username) {
      toast.error('You are now the highest bidder! Your bid has been recorded. Please wait until another user places a bid before bidding again. Thank you!', {
        position: 'bottom-center'
      })
      return setIsLoading(false)
    }

    if(data.amount > (currentUser?.balance || 0)) {
      toast.error('You do not have sufficient funds in your account to proceed with the bid.', {
        position: 'bottom-center'
      })
      return setIsLoading(false)
    }

    axios.post(`/api/bids/${bidModalHook.itemId}`, data)
      .then((res) => {
        toast.success('Bid placed')
        router.refresh()
        reset()
        bidModalHook.onClose()
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => setIsLoading(false))
  } 

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Place your bid"
        subtitle={`Enter your bid to join the auction for ${bidModalHook.itemName}`}
      />
      <div>
        <span className="flex flex-row items-center">
          Current last bid:<MdOutlineHive size={10} className="mr-1 ml-2"/> {bidModalHook.lastBid}
        </span>
        <span className="flex flex-row items-center">
          Minimum bid:<MdOutlineHive size={10} className="mr-1 ml-2"/> {(bidModalHook.lastBid || bidModalHook.startPrice) + incrementValue(bidModalHook.lastBid)}
        </span>
        <span className="flex flex-row items-center">
          Increment:<MdOutlineHive size={10} className="mr-1 ml-2"/> {incrementValue(bidModalHook.lastBid)}
        </span>
        <span className="flex flex-row items-center">
          Buyout Price:<MdOutlineHive size={10} className="mr-1 ml-2"/> {bidModalHook.buyoutPrice}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div>Increment Multiplier</div>
        <div className="flex flex-row gap-4">
          <Button
            label="1x"
            onClick={() => setCustomValue('amount', calculateBid(1, bidModalHook.lastBid, bidModalHook.startPrice))}
            small
          />
          <Button
            label="2x"
            onClick={() => setCustomValue('amount', calculateBid(2, bidModalHook.lastBid, bidModalHook.startPrice))}
            small
          />
          <Button
            label="3x"
            onClick={() => setCustomValue('amount', calculateBid(3, bidModalHook.lastBid, bidModalHook.startPrice))}
            small
          />
          <Button
            label="4x"
            onClick={() => setCustomValue('amount', calculateBid(4, bidModalHook.lastBid, bidModalHook.startPrice))}
            small
          />
          <Button
            label="5x"
            onClick={() => setCustomValue('amount', calculateBid(5, bidModalHook.lastBid, bidModalHook.startPrice))}
            small
          />
        </div>
      </div>
      <div>
        <Input
          id="amount"
          label="Amount"
          disabled={isLoading}
          register={register}
          errors={errors}
          watch={watch}
          required
        />
      </div>
    </div>
  )
  return (
    <Modal
      title={bidModalHook.itemName}
      actionLabel="Bid"
      body={bodyContent}
      isOpen={bidModalHook.isOpen}
      onClose={bidModalHook.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

export default BidModal;