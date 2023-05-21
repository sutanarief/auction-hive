import prisma from '@/app/libs/prismadb'

type IParams = {
  userId?: string;
}

export default async function getHistory(params: IParams) {
  try {
    const { userId } = params

    const history = await prisma.history.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        item: true
      }
    })

    if (!history) {
      return null
    }


    return history.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      item: {
        id: item.item?.id || item.id,
        title: item.item?.title ? item.item.title : item.action === "Top Up" ? "Top Up Balance" : "Start Now Fee",
        isEnded: item.item?.isEnded || false
      }
    }))

  } catch (error: any) {
    throw new Error(error)
  }
} 