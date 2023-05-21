import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";
import getItemById from "@/app/actions/getItemById";

type IParams = {
  itemId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()
  const itemById = await getItemById(params)

  if (!currentUser) return NextResponse.error()

  const body = await request.json()
  const {
    amount,
    action
  } = body

  const { itemId } = params
  
  if(!itemId || typeof itemId !== 'string') {
    throw new Error('Invalid ID')
  }

  const updateBidHistory = await prisma.history.updateMany({
    where: {
      AND: [
        {
          userId: currentUser.id
        },
        {
          itemId
        },
        {
          action: {
            equals: "Bid"
          }
        }
      ]
    },
    data: {
      isActive: false
    }
  })
  
  const bids = await prisma.bid.create({
    data: {
      amount: parseInt(amount, 10),
      itemId,
      userId: currentUser.id,
      isActive: true,
      action: "Bid"
    }
  })


  const history = await prisma.history.create({
    data: {
      amount: parseInt(amount, 10),
      itemId,
      userId: currentUser.id,
      isActive: true,
      action: "Bid"
    }
  })

  
  let biddedIds = [ ...(currentUser.biddedIds || [])]
  let bidderIds = [...(itemById?.bidderIds || [])]

  let isBidded = biddedIds.findIndex((x) => itemId === x)
  let isBidder = bidderIds.findIndex((x) => currentUser.id === x)
  let user
  let item

  if(isBidded === -1) {
    biddedIds.push(itemId)
    user = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        biddedIds
      }
    })
  }

  if(isBidder === -1) {
    bidderIds.push(currentUser.id)
    item = await prisma.item.update({
      where: {
        id: itemId
      },
      data: {
        bidderIds
      }
    })
  }



  return NextResponse.json({bids, user, item})
}