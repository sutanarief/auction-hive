import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";
import getItemById from "@/app/actions/getItemById";
import axios from "axios";
import { SafeBid } from "@/app/types";


type IParams = {
  itemId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()
  const itemById = await getItemById(params)

  const { itemId } = params 

  if(!itemId || typeof itemId !== 'string') {
    throw new Error('Invalid ID')
  }

  if (!currentUser) return NextResponse.error()

  const bids = await prisma.bid.create({
    data: {
      amount: itemById?.buyoutPrice || 0,
      itemId,
      userId: currentUser.id,
      action: 'Buyout',
      isActive: false
    }
  })

  const bidHistory = await prisma.history.create({
    data: {
      amount: itemById?.buyoutPrice || 0,
      itemId,
      userId: currentUser.id,
      action: 'Buyout',
      isActive: true
    }
  })

  const soldHistory = await prisma.history.create({
    data: {
      amount: itemById?.buyoutPrice || 0,
      userId: itemById?.userId || "",
      itemId,
      action: 'Item Sold',
      isActive: true
    }
  })
  
  const seller = await prisma.user.update({
    where: {
      id: itemById?.userId
    },
    data: {
      balance: {
        increment: itemById?.buyoutPrice
      }
    }
  })
  
  let biddedIds = [ ...(currentUser.biddedIds || [])]
  let winItemIds = [...(currentUser.winItemIds || [])]
  let bidderIds = [...(itemById?.bidderIds || [])]

  winItemIds.push(itemId)

  let isBidded = biddedIds.findIndex((x) => x === itemId)
  let isBidder = bidderIds.findIndex((x) => x === currentUser.id)
  let user
  let item

  if(isBidded === -1) {
    biddedIds.push(itemId)
  }
  user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      biddedIds,
      winItemIds,
      balance: {
        decrement: itemById?.buyoutPrice || 0
      }
    }
  })

  if(isBidder === -1) {
    bidderIds.push(currentUser.id)
  }
  item = await prisma.item.update({
    where: {
      id: itemId
    },
    data: {
      bidderIds,
      winnerId: currentUser.id,
      isActive: false,
      isEnded: true,
      endDate: new Date(),
      bidId: bids.id
    }
  })
  
  
  const deactiveHistory = await prisma.history.updateMany({
    where: {
      AND: [
        {
          itemId
        },
        {
          action: "Bid"
        }
      ]

    },
    data: {
      isActive: false
    }
  })

  const deactiveBid = await prisma.bid.updateMany({
    where: {
      AND: [
        {
          itemId
        },
        {
          action: "Bid"
        }
      ]

    },
    data: {
      isActive: false
    }
  })

  return NextResponse.json({item, user, bids, deactiveBid, seller, deactiveHistory, soldHistory, bidHistory})
}

export async function PUT(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser()
  const { itemId } = params
  const body = await request.json()

  const {
    title,
    description,
    startDate,
    endDate,
    isActive,
    imageSrc,
    category,
    buyoutPrice,
    initialPrice
  } = body

  let updateItem
  let user
  let history

  if(body.startNow) {
    history = await prisma.history.create({
      data: {
        amount: 10,
        userId: currentUser?.id || "",
        action: "Pay",
        isActive: true
      }
    })
    
    user = await prisma.user.update({
      where: {
        id: currentUser?.id
      },
      data: {
        balance: {
          decrement: 10
        }
      }
    })

    updateItem = await prisma.item.update({
      where: {
        id: itemId
      },
      data: {
        isActive: true,
        startDate: new Date()
      }
    })
  } else {
    updateItem = await prisma.item.update({
      where: {
        id: itemId
      },
      data: {
        title,
        description,
        startDate,
        endDate,
        isActive,
        imageSrc,
        category,
        buyoutPrice: parseInt(buyoutPrice, 10),
        initialPrice: parseInt(initialPrice, 10)
      }
    })
  }


  return NextResponse.json(updateItem)
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { itemId } = params 

  if(!itemId || typeof itemId !== 'string') {
    throw new Error('Invalid ID')
  }

  const item = await prisma.item.delete({
    where: {
      id: itemId
    }
  })

  return NextResponse.json(item)
}