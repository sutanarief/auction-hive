'use client'

import Container from "@/app/components/Container";
import ItemHead from "@/app/components/items/ItemHead";
import ItemInfo from "@/app/components/items/ItemInfo";
import { categories } from "@/app/components/navbar/Categories";
import { SafeBid, SafeItem, SafeUser } from "@/app/types";
import { Bid } from "@prisma/client";
import { useMemo } from "react";


type ItemClientProps = {
  bids?: SafeBid[]
  item: SafeItem & {
    owner: {
      username: string | null
      image: string | null
    },
    winner?: {
      username: string | null
      image: string | null
    } | null | undefined,
    bids?: SafeBid[]
  };
  currentUser?: SafeUser | null
}

const ItemClient:React.FC<ItemClientProps> = ({
  bids,
  item,
  currentUser
}) => {

  const category = useMemo(() => {
    return categories.find((x) => x.label === item.category)
  }, [item.category])

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-2">
          <ItemHead 
            item={item}
            currentUser={currentUser}
            category={category}
            bids={bids}
          />
        </div>
      </div>
    </Container>
  );
}
 
export default ItemClient;