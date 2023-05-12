import getCurrentUser from "@/app/actions/getCurrentUser";
import getItemById from "@/app/actions/getItemById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ItemClient from "./ItemClient";
import getBidsByItemId from "@/app/actions/getBids";

type IParams = {
  itemId: string
}

const ItemRoom = async ({
  params
}: { params: IParams}) => {

  const item = await getItemById(params)
  const currentUser = await getCurrentUser()
  const bids = await getBidsByItemId(params)

  if (!item) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }


  return (
    <ClientOnly>
      <ItemClient 
        item={item}
        currentUser={currentUser}
        bids={bids}
      />
    </ClientOnly>
  );
}
 
export default ItemRoom;