'use client'

import { MdOutlineHive } from "react-icons/md";
import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import Button from "../components/Button";
import useBalanceModal from "../hooks/useBalanceModal";

const Balance = () => {
  const balanceModal = useBalanceModal()

  const formatBalance = (balance: number) => {
    const reversed = balance.toString().split('').reverse();
    const chunks = [];
  
    while (reversed.length) {
      chunks.push(reversed.splice(0, 3));
    }
  
    const formatted = chunks.map(chunk => chunk.join('')).join(',');
    return formatted.split('').reverse().join('');
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
            border-red-500
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
                  <MdOutlineHive size={30}/>{formatBalance(99999999)}
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
                <MdOutlineHive size={30}/>{formatBalance(20000000)}
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
                <MdOutlineHive size={30}/>{formatBalance(70999999)}
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
      </Container>
    </ClientOnly>
  );
}

export default Balance;