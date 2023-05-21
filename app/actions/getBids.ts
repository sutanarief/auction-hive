import prisma from '@/app/libs/prismadb'


type IParams = {
  itemId?: string;
  userId?: string;
}

export default async function getBidsById(params: IParams) {
  try {

    const { itemId, userId } = params

    const bids = await prisma.bid.findMany({
      where: itemId ? { itemId } : { userId },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true,
        item: true
      }
    })

    if (bids.length === 0) return []

    return bids.map((bid) => {
      return {
        ...bid,
        createdAt: bid.createdAt.toISOString(),
        user: {
          username: bid.user.username ?? null
        },
        item: {
          id: bid.item.id ?? null,
          title: bid.item.title ?? null,
          isEnded: bid.item.isEnded
        }
      }
    })
  } catch (error: any) {
    throw new Error(error)
  }
}