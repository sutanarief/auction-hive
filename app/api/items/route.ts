import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.error()

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

  const items = await prisma.item.create({
    data: {
      title,
      description,
      startDate,
      endDate,
      isActive,
      imageSrc,
      category,
      buyoutPrice: parseInt(buyoutPrice, 10),
      initialPrice: parseInt(initialPrice, 10),
      userId: currentUser.id,
    }
  })

  return NextResponse.json(items)
}