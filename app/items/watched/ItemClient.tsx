'use client'

import Container from "@/app/components/Container";
import RegisterItemCard from "@/app/components/RegisterItemCard";
import ItemHead from "@/app/components/items/ItemHead";
import ItemInfo from "@/app/components/items/ItemInfo";
import Categories, { categories } from "@/app/components/navbar/Categories";
import { SafeBid, SafeItem, SafeUser } from "@/app/types";
import { Bid } from "@prisma/client";
import { useMemo } from "react";
import moment from 'moment'
import { useSearchParams } from "next/navigation";
import UserItemCard from "@/app/components/items/UserItemCard";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";


type ItemClientProps = {
  currentUser?: SafeUser & {
    watchedItems: SafeItem[]
  } | null
}

const ItemClient:React.FC<ItemClientProps> = ({
  currentUser
}) => {
  const params = useSearchParams()
  const category = params?.get('category')
  const items = currentUser?.watchedItems || []

  const mainCategory = ["Active", "Upcoming", "Finished"]

  const itemsByCategory = items.filter((item) => {
    if (mainCategory.includes(category || "")) {
      let res;
      switch (category) {
        case "Active":
          if (item.isActive) {
            res = item
          }
          return res
        case "Upcoming":
          if (!item.isActive && new Date(moment(item.endDate).startOf('day').format()) > new Date(moment().startOf('day').format())) {
            res = item
          }
          return res
        case "Finished":
          if(item.winnerId || new Date(item.endDate) < new Date()) {
            res = item
          }
          return res
      }
    } else {
      if (item.category === category) {
        return item
      }
    }
  })

  if (itemsByCategory.length === 0 && category) {
    return (
      <ClientOnly>
        <EmptyState
          showReset
          title='Your Watchlist is Empty, Dive Into Exciting Items and Begin Your Viewing Journey'
          subtitle="Explore unwatched gems and uncover hidden riches"
          label='Back to Home'
          category={category || ""}
        />
      </ClientOnly>
    )
  }

  return (
    <div
    className="
      pt-24
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8
    "
  >
    {category ? (
        itemsByCategory.map((item: any) => {
          return (
            <UserItemCard
              currentUser={currentUser}
              key={item.id}
              data={item}
            />
          )
        })
      ) : (
        items.map((item: any) => {
          return (
            <UserItemCard
              currentUser={currentUser}
              key={item.id}
              data={item}
            />
          )
        })
      )}
    </div>
  );
}
 
export default ItemClient;