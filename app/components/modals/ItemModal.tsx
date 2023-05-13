'use client'

import useItemModal from "@/app/hooks/useItemModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineHive } from 'react-icons/md'
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import Calendar from "../inputs/Calendar";
import { SafeUser } from "@/app/types";
import { Range } from "react-date-range";
import { addDays } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  IMAGES = 1,
  DESCRIPTION = 2,
  TIME = 3,
  PRICE = 4,
}

const initialDateRange = {
  startDate: addDays(new Date(), 1),
  endDate: addDays(new Date(), 1),
  key: 'selection'
}

type ItemModalProps = {
  currentUser?: SafeUser | null
}

const ItemModal:React.FC<ItemModalProps> = ({
  currentUser
}) => {
  const itemModal = useItemModal()
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

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
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      isActive: false,
      imageSrc: '',
      category: '',
      buyoutPrice: 1,
      initialPrice: 1
    }
  })

  const router = useRouter()

  const category = watch('category')
  const imageSrc = watch('imageSrc')
  const startDate = watch('startDate')
  const endDate = watch('endDate')

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    setStep((val) => val - 1)
  }

  const onNext = () => {
    setStep((val) => val + 1)
  }

  const actionLabel = useMemo(() => {
    if(step === STEPS.PRICE) return 'List'
    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if(step === STEPS.CATEGORY) return undefined
    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading 
        title="Which of these best describes your item?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div
            key={item.label}
            className="col-span-1"
          >
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Add a photo of your item"
          subtitle="Show bidders what your item looks like!"
        />
        <ImageUpload 
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="How would you describe your item?"
          subtitle="Short and clear work best!"
        />
        <Input 
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          watch={watch}
          required
        />
        <hr />
        <Input 
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          watch={watch}
          required
        />
      </div>
    )
  }

  if (step === STEPS.TIME) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="How long would you like this item to be auctioned for?"
          subtitle="Your item will be eligible for auction starting one day after it is listed, and auctions take place everyday at 10 AM."
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    )
  }

  if(step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading 
          title="Now, set your price"
          subtitle="Set the initial price and the buyout price too"
        />
        <div className="text-neutral-400 flex flex-row items-center">
          1 <MdOutlineHive size={18} /> = 1$
        </div>
        <Input 
          id="initialPrice"
          label="Initial Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          watch={watch}
        />
        <hr />
        <Input 
          id="buyoutPrice"
          label="Buyout Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          watch={watch}
        />
      </div>
    )
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext()
    data.startDate = dateRange.startDate
    data.endDate = dateRange.endDate


    setIsLoading(true)

    axios.post('/api/items', data)
      .then(() => {
        toast.success('Item Registerd')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        itemModal.onClose()
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => setIsLoading(false))
  } 

  return (
    <Modal 
      title='List an Item'
      isOpen={itemModal.isOpen}
      onClose={itemModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default ItemModal;