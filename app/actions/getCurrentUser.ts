import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/app/libs/prismadb"

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null

    let currentUser = await prisma.user.findUnique({
      where : {
        email: session.user.email as string
      },
      include: {
        watchedItems: {
          include: {
            owner: true,
            winner: true,
            bids: {
              include: {
                user: true,
                item: true
              }
            }
          }
        },
        listedItems: true,
        bids: {
          include: {
            item: true,
            user: true
          }
        }
      }
    })

    if (!currentUser) return null

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
      bids: currentUser.bids.map((bid) => ({
        ...bid,
        createdAt: bid.createdAt.toISOString(),
        item: {
          isEnded: bid.item.isEnded,
          id: bid.item.id,
          title: bid.item.title
        },
        user: {
          username: bid.user.username || null
        }
      })),
      watchedItems: currentUser.watchedItems.map((item) => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
        endDate: item.endDate.toISOString(),
        startDate: item.startDate.toISOString(),
        owner: {
          username: item.owner.username,
          image: item.owner.image
        },
        winner: {
          username: item.winner?.username || null,
          image: item.winner?.image || null
        },
        bids: item.bids?.map((bid) => ({
          ...bid,
          createdAt: bid.createdAt.toISOString(),
          user: {
            username: bid.user.username
          }
        })),
        item: {
          id: item.id,
          title: item.title,
          isEnded: item.isEnded
        }
      }))
    }
  } catch (error: any) {
    return null
  }
}