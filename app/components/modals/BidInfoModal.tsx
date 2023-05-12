'use client'

import useBidInfoModal from "@/app/hooks/useBidInfoModal";
import Modal from "./Modal";
import { MdOutlineHive } from "react-icons/md";

const bidRange = [
  {
  start: "5",
  end: "50",
  increment: "1"
  },
  {
  start: "51",
  end: "100",
  increment: "2"
  },
  {
  start: "101",
  end: "200",
  increment: "5"
  },
  {
  start: "201",
  end: "500",
  increment: "10"
  },
  {
  start: "501",
  end: "2,000",
  increment: "25"
  },
  {
  start: "2,001",
  end: "5,000",
  increment: "100"
  },
  {
  start: "5,001",
  end: "10,000",
  increment: "250"
  },
  {
  start: "10,001",
  end: "30,000",
  increment: "500"
  },
  {
  start: "30,001",
  end: "50,000",
  increment: "2000"
  },
  {
  start: "50,001",
  end: "500,000",
  increment: "5000"
  },
  {
  start: "500,001",
  end: "2,500,000",
  increment: "10000"
  },
  {
  start: "2,500,000+",
  end: "-",
  increment: "50000"
  },
]

const BidInfoModal = () => {
  const infoModal = useBidInfoModal()

  const bodyContent = (
    <div className="flex flex-col gap-1">
      <strong>Dear valued bidders,</strong>
      <div> All items will be sold to the highest bidder when the auction timer expires. Please note that the bid increment for each item is based on its minimum bid range. </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden sm:rounded-lg">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th scope="col" className="px-6 py-1 text-xs font-medium uppercase tracking-wider">Min</th>
                    <th scope="col" className="px-6 py-1 text-xs font-medium uppercase tracking-wider">Max</th>
                    <th scope="col" className="px-6 py-1 text-xs font-medium uppercase tracking-wider">Increment</th>
                  </tr>
                </thead>
                <tbody>
                  {bidRange.map((range) => (
                    <tr key={range.start} className="border-b">
                      <td className="px-6 whitespace-nowrap text-left">
                        <span className="items-baseline inline-flex text-xs leading-5 font-semibold">
                          <MdOutlineHive size={10} className="mr-1"/> {range.start}
                        </span>
                      </td>
                      <td className="px-6 whitespace-nowrap text-left">
                        <span className="items-baseline inline-flex text-xs leading-5 font-semibold">
                          <MdOutlineHive size={10} className="mr-1"/> {range.end}
                        </span>
                      </td>
                      <td className="px-6 whitespace-nowrap text-left">
                        <span className="items-baseline inline-flex text-xs leading-5 font-semibold">
                          <MdOutlineHive size={10} className="mr-1"/> {range.increment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div>This means that different bid ranges will have different increment values. Thank you for your understanding and happy bidding!</div>
    </div>
  )

  return (
    <Modal 
      title="About bidding"
      isOpen={infoModal.isOpen}
      onClose={infoModal.onClose}
      onSubmit={infoModal.onClose}
      actionLabel="Close"
      body={bodyContent}
    />
  );
}

export default BidInfoModal;