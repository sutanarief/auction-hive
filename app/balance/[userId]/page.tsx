import getCurrentUser from "@/app/actions/getCurrentUser";
import getItemById from "@/app/actions/getItemById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import BalanceClient from "./BalanceClient";
import getBidsById from "@/app/actions/getBids";
import getHistory from "@/app/actions/getHistory";

type IParams = {
  userId: string
}

const Balance = async ({
  params
}: { params: IParams}) => {

  const currentUser = await getCurrentUser()
  const bids = await getBidsById(params)
  const history = await getHistory(params)

  return (
    <ClientOnly>
      <BalanceClient
        currentUser={currentUser}
        bids={bids}
        history={history}
      />
    </ClientOnly>
  );
}

export default Balance;