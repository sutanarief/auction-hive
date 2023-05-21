import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(
  request: Request
) {
  try {
    const user = prisma.user.deleteMany({})
    const bid = prisma.bid.deleteMany({})
    const history = prisma.history.deleteMany({})
    const item = prisma.item.deleteMany({})
    const account = prisma.account.deleteMany({})
    return NextResponse.json({user, item, bid, history, account})
  } catch (error) {

    return NextResponse.error()
  }
}