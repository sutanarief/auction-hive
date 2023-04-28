'use client'

import React, { useState, useCallback } from 'react';
import { signIn } from 'next-auth/react'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form'

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';


const LoginModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn('credentials', {
      ...data,
      redirect: false
    })
    .then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success('Logged in')
        router.refresh()
        loginModal.onClose()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const onClickRegister = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome Back Bidders'
        subTitle='Login to your account!'
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        watch={watch}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        watch={watch}
        required
      />
      <div
        className='
          -mb-5
          cursor-pointer
          hover:underline
          font-medium
          text-blue-800
          self-end
        '
      >Forgot password ?</div>
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <div
        className='flex gap-4 items-center'
      >
        <div className='
          h-[1px]
          bg-neutral-500
          w-full
        '
        ></div>
        <div
          className='
          font-semibold
          h-fit
          text-neutral-500
          '
        >OR</div>
        <div className='
          h-[1px]
          bg-neutral-500
          w-full
        '
        ></div>
      </div>
      <Button 
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button 
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className='
          text-neutral-500
          text-center
          mt-4
          font-light
        '
      >
        <div className='flex flex-row items-center gap-2 justify-center'>
          <div>
            Creat an account ?
          </div>
          <div
            className='
              cursor-pointer
              hover:underline
              font-medium
              text-blue-800
            '

            onClick={onClickRegister}
          >
            Register
          </div>
        </div>
      </div>
    </div>
  )
  
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Login'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
export default LoginModal;