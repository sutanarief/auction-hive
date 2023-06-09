'use client';

import React, { useCallback, useEffect, useState, KeyboardEvent } from 'react';
import { IoMdClose } from 'react-icons/io'
import Button from '../Button';
import { FieldValues, UseFormReset } from 'react-hook-form';

type ModalProps = {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  actionLabel: string
  disabled?: boolean
  secondaryAction?: () => void
  secondaryActionLabel?: string
  // isSuccess: boolean
  // reset: UseFormReset<FieldValues>
};

const Modal:React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel
}) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])
  
  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }

    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [disabled, onClose])
  
  useEffect(() => {
    const handleEscClose = (event: Event): void => {
      if ((event as unknown as KeyboardEvent).key === 'Escape') {
        setShowModal(false)
        setTimeout(() => {
          onClose()
        }, 300)
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return
    }
    
    onSubmit()
  }, [disabled, onSubmit])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.code === 'Enter') {
      handleSubmit()
    }
  }

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return
    }

    secondaryAction()
  }, [disabled, secondaryAction])

  if (!isOpen) {
    return null
  }

  return (
    <>
      <div
        onKeyDown={handleKeyDown}
        className='
          justify-center
          items-center
          flex
          overflow-x-auto
          overflow-y-auto
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          bg-neutral-800/70
        '
      >
        <div
          className='
            relative
            w-full
            lg:w-2/5
            my-6
            mx-auto
            scale-100
            2xl:scale-100
            sm:h-auto
          '
        >
          {/* CONTENT */}
          <div
            className={`
              translate
              duration-300
              h-full
              ${showModal ? 'translate-y-0' : 'translate-y-full'}
              ${showModal ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div
              className='
                translate
                h-full
                mt-5
                lg:h-auto
                md:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
              '
            >
              {/* HEADER */}
              <div
                className='
                  flex
                  items-center
                  p-6
                  rounded-t
                  justify-center
                  relative
                  border-b-[1px]
                '
              >
                <div className='text-lg font-semibold'>
                  {title}
                </div>
                <button
                  onClick={handleClose}
                  className='
                    p-1
                    border-0
                    hover:opacity-50
                    transition
                    absolute
                    right-9
                  '
                >
                  <IoMdClose size={18}  />
                </button>
              </div>
              {/* BODY */}
              <div className='relative p-6 flex-auto'>
                {body}
              </div>
              {/* FOOTER */}
              <div className='flex flex-col gap-2 p-6'>
                <div
                  className='
                    flex
                    flex-row
                    items-center
                    gap-4
                    w-full
                  '
                >
                  {secondaryAction && secondaryActionLabel && (
                      <Button 
                        outline
                        disabled={disabled}
                        label={secondaryActionLabel}
                        onClick={handleSecondaryAction}
                      />
                  )}
                  <Button 
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Modal;