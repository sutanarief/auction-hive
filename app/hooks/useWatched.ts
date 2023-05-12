import axios from 'axios'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'

import { SafeUser } from '../types'
import useLoginModal from './useLoginModal'

type IUseWatched = {
  itemId: string;
  currentUser?: SafeUser | null
}

const useWatched = ({
  itemId,
  currentUser
}: IUseWatched) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasWatched = useMemo(() => {
    const list = currentUser?.itemIds || []

    return list.includes(itemId)
  }, [currentUser, itemId])

  const toggleWatch = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    if(!currentUser) {
      return loginModal.onOpen()
    }

    try {
      let request;

      if(hasWatched) {
        request = () => axios.delete(`/api/watched/${itemId}`)
      } else {
        request = () => axios.post(`/api/watched/${itemId}`)
      }

      await request()
      router.refresh()
      toast.success('success')
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }, [currentUser, hasWatched, itemId, loginModal, router])

  return {
    hasWatched,
    toggleWatch
  }
}

export default useWatched