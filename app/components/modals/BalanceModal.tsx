'use client'
import useBalanceModal from "@/app/hooks/useBalanceModal";
import Modal from "./Modal";
import { useState } from "react";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";

type BalanceModalProps = {
  currentUser?: SafeUser | null
}

const BalanceModal:React.FC<BalanceModalProps> = ({ currentUser }) => {
  const balanceModalHook = useBalanceModal()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()


  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      amount: 1,
    }
  })

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading 
        title="Top up"
        subtitle="Enter the Amount to Top Up Your Balance"
      />
      <Input 
        id="amount"
        label="Total Amount"
        formatPrice
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        watch={watch}
      />
    </div>
  )

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    const currentBalance = currentUser?.balance || 0
    const total = currentBalance + parseInt(data.amount, 10)
    console.log({total, currentBalance, userBalance: currentUser?.balance})

    if(currentBalance > 0) {
      if((currentBalance + parseInt(data.amount, 10)) > 99999999) {
        console.log('masuk')
        setIsLoading(false)
        return toast.error("Maximum balance in your account is 99,999,999")
      }
    }

    if (data.amount > 99999999) {
      setIsLoading(false)
      return toast.error("Maximum top up amount is 99,999,999")
    }

    axios.put(`/api/balance`, data)
    .then(() => {
      toast.success('Top up success')
      router.refresh()
      reset()
      balanceModalHook.onClose()

    })
    .catch((error: any) => {

    })
    .finally(() => setIsLoading(false))
  }

  return (
    <Modal
      title="Top Up Balance"
      isOpen={balanceModalHook.isOpen}
      onClose={balanceModalHook.onClose}
      body={bodyContent}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Top Up"
    />
  );
}
 
export default BalanceModal;