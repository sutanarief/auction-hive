import prisma from '@/app/libs/prismadb'


export default async function getItems() {
  try {
    const items = await prisma.item.findMany({
      orderBy: {
        endDate: 'desc'
      },
      include: {
        bids: {
          include: {
            user: true,
          }
        },
        winner: true
      }
    })

    if (items.length === 0) return []

    return items.map((item) => {
      return {
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
        endDate: item.endDate.toISOString(),
        startDate: item.startDate.toISOString(),
        bids: item.bids?.map((bid) => ({
          ...bid,
          createdAt: bid.createdAt.toISOString(),
          user: {
            username: bid.user.username
          }
        })),
        winner: {
          username: item.winner?.username
        }
      }
    })
  } catch (error: any) {
    throw new Error(error)
  }
}