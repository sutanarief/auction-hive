import prisma from '@/app/libs/prismadb'

type IParams = {
  itemId?: string;
}

export default async function getItemById(params: IParams) {
  try {
    const { itemId } = params

    const item = await prisma.item.findUnique({
      where: {
        id: itemId
      },
      include: {
        owner: true,
        winner: true,
        bids: {
          include: {
            user: true
          }
        }
      }
    })

    if (!item) {
      return null
    }


    return {
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
        }
      }))
    }

  } catch (error: any) {
    throw new Error(error)
  }
} 