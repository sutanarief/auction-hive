import { NextResponse } from 'next/server'

import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'
import getItemById from '@/app/actions/getItemById';


type IParams = {
  itemId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()
  const itemById = await getItemById(params)

  if(!currentUser) {
    return NextResponse.error()
  }

  const { itemId } = params
  
  if(!itemId || typeof itemId !== 'string') {
    throw new Error('Invalid ID')
  }

  let itemIds = [ ...(currentUser.itemIds || [])]
  let userIds = [...(itemById?.userIds || [])]

  itemIds.push(itemId)
  userIds.push(currentUser.id)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      itemIds
    }
  })

  const item = await prisma.item.update({
    where: {
      id: itemId
    },
    data: {
      userIds
    }
  })

  return NextResponse.json({user, item})
}

export async function DELETE(request: Request, { params } : { params: IParams }) {
  const currentUser = await getCurrentUser()
  const itemById = await getItemById(params)

  if(!currentUser) {
    return NextResponse.error()
  }

  const { itemId } = params
  
  if(!itemId || typeof itemId !== 'string') {
    throw new Error('Invalid ID')
  }

  let itemIds = [ ...(currentUser.itemIds || [])]
  let userIds = [ ...(itemById?.userIds || [])]

  itemIds = itemIds.filter((id) => id !== itemId)
  userIds = userIds.filter((id) => id !== currentUser.id)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      itemIds
    }
  })

  const item = await prisma.item.update({
    where: {
      id: itemId
    },
    data: {
      userIds
    }
  })

  return NextResponse.json(user)

}