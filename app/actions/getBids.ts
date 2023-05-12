import prisma from '@/app/libs/prismadb'


type IParams = {
  itemId?: string;
}

export default async function getBidsByItemId(params: IParams) {
  try {

    const { itemId } = params

    const bids = await prisma.bid.findMany({
      where: {
        itemId: itemId
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true
      }
    })

    if (bids.length === 0) return []

    return bids.map((bid) => {
      return {
        ...bid,
        createdAt: bid.createdAt.toISOString(),
        user: {
          username: bid.user.username ?? null
        }
      }
    })
  } catch (error: any) {
    throw new Error(error)
  }
}