import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PUT(
  request: Request
) {
  const currentUser = await getCurrentUser()
  const currentBalance = currentUser?.balance || 0

  if (!currentUser) return NextResponse.error()

  const body = await request.json()
  const {
    amount
  } = body


  const balance = await prisma.history.create({
    data: {
      amount: parseInt(amount, 10),
      userId: currentUser.id,
      action: "Top Up",
      isActive: true
    }
  })

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      balance: parseInt(amount, 10) + currentBalance
    }
  })

  return NextResponse.json({user, balance})
}