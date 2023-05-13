import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";
import getItemById from "@/app/actions/getItemById";
import axios from "axios";
import { SafeBid } from "@/app/types";


type IParams = {
  itemId?: string;
}

export async function PUT(
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
    }
  })

  
  let biddedIds = [ ...(currentUser.biddedIds || [])]
  let winItemIds = [...(currentUser.winItemIds || [])]
  let bidderIds = [...(itemById?.bidderIds || [])]

  winItemIds.push(itemId)

  let isBidded = biddedIds.findIndex((x) => itemId)
  let isBidder = bidderIds.findIndex((x) => currentUser.id)
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
      winItemIds
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
      endDate: new Date(),
      bidId: bids.id
    }
  })

  return NextResponse.json({item, user, bids})
}