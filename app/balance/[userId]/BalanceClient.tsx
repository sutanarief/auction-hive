'use client'

import { MdOutlineHive } from "react-icons/md";
import ClientOnly from "../../components/ClientOnly";
import Container from "../../components/Container";
import Button from "../../components/Button";
import useBalanceModal from "../../hooks/useBalanceModal";
import { SafeBid, SafeHistory, SafeUser } from "@/app/types";
import moment from "moment"

type BalanceClientProps = {
  currentUser?: SafeUser | null
  bids?: SafeBid[] & {
    item?: {
      id: string,
      title: string,
      isEnded: boolean
    }
  } | null;
  history?: SafeHistory[] & {
    item?: {
      id: string,
      title: string,
      isEnded: boolean
    }
  } | null
}

const BalanceClient:React.FC<BalanceClientProps> = ({
  currentUser,
  bids,
  history
}) => {

  const balanceModal = useBalanceModal()
  
  const highestBids: SafeHistory[] | undefined = history?.reduce((acc: SafeHistory[], bid: SafeHistory) => {
    const existingBid = acc.find((b: SafeHistory) => b.itemId === bid.itemId);
    if (!existingBid || bid.amount > existingBid.amount) {
      acc = acc.filter((b: SafeHistory) => b.itemId !== bid.itemId);
      if(bid.isActive) {
        acc.push(bid);
      }
    }
    return acc; 
  }, []);

  const allTransaction: (SafeBid | SafeHistory)[] = []
  highestBids?.forEach((item) => allTransaction.push(item))
  history?.forEach((item) => allTransaction.push(item))


  const sortTransaction = allTransaction.sort((a: SafeBid | SafeHistory, b: SafeBid | SafeHistory) => {
    return +new Date(b.createdAt) - +new Date(a.createdAt)
  })

  console.log({sortTransaction, highestBids, history})

  const formatBalance = (balance: number) => {
    const reversed = balance.toString().split('').reverse();
    const chunks = [];
  
    while (reversed.length) {
      chunks.push(reversed.splice(0, 3));
    }
  
    const formatted = chunks.map(chunk => chunk.join('')).join(',');
    return formatted.split('').reverse().join('');
  }

  const calculateUsed = (totalBid: SafeHistory[]) => {

    let total = totalBid.map((item) => {
      if(item.action === 'Bid' && !item.item.isEnded) {
        return item
      }
    }).reduce((acc, current) => acc + (current?.amount || 0), 0)

    return total
  }

  const formatColor = (action: string, isActive: boolean, isEnded: boolean) => {
    switch (action) {
      case "Bid":
        return isActive ? isEnded ? "text-rose-600" : "text-yellow-600" : "text-neutral-400"
      case "Buyout":
        return "text-rose-600"
      case "Winning Bid":
        return "text-rose-600"
      case "Top Up":
        return "text-green-600"
      case "Item Sold":
        return "text-green-600"
      case "Pay":
        return "text-rose-600"
    }
  }

  const formatLabel = (action: string, isActive: boolean, isEnded: boolean) => {
    const actionList = ["Top Up", "Buyout", "Item Sold", "Winning Bid", "Pay"]
    if (action === "Bid") {
      if(isActive) {
        return "Active"
      }
      return "Unactive"
    }

    if (actionList.includes(action)) {
      return "Success"
    }
  }

  return (
    <ClientOnly>
      <Container>
        <div 
          className="
            flex
            flex-col
            gap-4
            mx-auto
            max-w-screen-lg
            border-2
            shadow-md
            rounded-md
            p-4"
          >
          <div className="text-2xl font-bold">Balance</div>
          <hr />
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col gap-1 sm:gap-4">
              <div className="text-neutral-500">Actual Balance</div>
              <div className="flex flex-col gap1">
                <div
                  className="
                    text-3xl
                    lg:text-4xl
                    font-extrabold
                    text-neutral-800
                    flex
                    flex-row
                    items-center
                    "
                >
                  <MdOutlineHive size={30}/>{formatBalance(currentUser?.balance || 0)}
                </div>
                <div className="text-neutral-400 text-sm flex flex-row items-center self-end">Max. <MdOutlineHive className="ml-1" size={12}/>{formatBalance(99999999)}</div>
              </div>
            </div>
            <div className="flex flex-col gap-1 sm:gap-4">
              <div className="text-neutral-500">Used for Bid</div>
              <div
                className="
                  text-3xl
                  lg:text-4xl
                  font-extrabold
                  text-neutral-800
                  flex
                  flex-row
                  items-center
                  "
              >
                <MdOutlineHive size={30}/>{formatBalance(calculateUsed(highestBids || []))}
              </div>
            </div>
            <div className="flex flex-col gap-1 sm:gap-4">
              <div className="text-neutral-500">Current Balance</div>
              <div
                className="
                  text-3xl
                  lg:text-4xl
                  font-extrabold
                  text-neutral-800
                  flex
                  flex-row
                  items-center
                  "
              >
                <MdOutlineHive size={30}/>{formatBalance((currentUser?.balance || 0) - calculateUsed(highestBids || []))}
              </div>
            </div>
          </div>
          <div
            className="
              w-full
              sm:w-3/5
              self-center
              mt-4
            "
          >
            <Button
              label="Top Up"
              onClick={balanceModal.onOpen}
            />
          </div>
        </div>
        <div
          className="
            mt-8
            flex
            flex-col
            gap-4
            mx-auto
            max-w-screen-lg
            border-2
            shadow-md
            rounded-md
            p-4
          "
        >
          <div className="text-2xl font-bold">Transaction History</div>
          <hr />
          <div className="flex flex-col overflow-auto p-6 h-80">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">No</th>
                        <th scope="col" className="px-6 py-4">Item</th>
                        <th scope="col" className="px-6 py-4">Date</th>
                        <th scope="col" className="px-6 py-4">Type</th>
                        <th scope="col" className="px-6 py-4">Amount</th>
                        <th scope="col" className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history?.map((item, index) => (
                        <tr className="border-b dark:border-neutral-500" key={item.id}>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                          <td className="whitespace-nowrap px-6 py-4">{item.item.title}</td>
                          <td className="whitespace-nowrap px-6 py-4">{moment(item.createdAt).format('lll')}</td>
                          <td 
                            className={`
                              whitespace-nowrap
                              px-6
                              font-semibold
                              py-4
                              ${formatColor(item.action, item.isActive, item.item.isEnded)}
                            `}
                          >
                            {item.action}
                          </td>
                          <td 
                            className={`
                              whitespace-nowrap
                              px-6
                              py-4
                              font-semibold
                              flex
                              flex-row
                              items-center
                              ${formatColor(item.action, item.isActive, item.item.isEnded)}
                            `}
                          >
                            {item.action === "Top Up" || item.action === "Item Sold" ? "+" : "-"}<MdOutlineHive size={18}/>{item.amount}
                          </td>
                          <td 
                            className={`
                              whitespace-nowrap
                              px-6
                              font-semibold
                              py-4
                              ${formatColor(item.action, item.isActive, item.item.isEnded)}
                            `}
                          >
                            {formatLabel(item.action, item.isActive, item.item.isEnded)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </ClientOnly>
  );
}

export default BalanceClient;