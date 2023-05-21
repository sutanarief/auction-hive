import prisma from '@/app/libs/prismadb'

type IParams = {
  userId?: string;
}

export default async function getItemByUserId(params: IParams) {
  try {
    const { userId } = params
    

    const items = await prisma.item.findMany({
      where: {
        userId: userId
      },
      include: {
        owner: true,
        winner: true,
        bids: {
          include: {
            user: true,
            item: true
          }
        }
      },
      orderBy: {
        endDate: 'desc'
      }
    })

    if (items.length === 0) return []


    return items.map((item) => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
        endDate: item.endDate.toISOString(),
        startDate: item.startDate.toISOString(),
        owner: {
          username: item.owner.username,
          image: item.owner.image
        },
        winner: item.winner ? {
          username: item.winner.username,
          image: item.winner.image
        } : null,
        bids: item.bids?.map((bid) => ({
          ...bid,
          createdAt: bid.createdAt.toISOString(),
          user: {
            username: bid.user.username
          },
          item: {
            id: bid.item.id,
            title: bid.item.title,
            isEnded: bid.item.isEnded
          }
        }))
    }))
  } catch (error: any) {
    throw new Error(error)
  }
} 