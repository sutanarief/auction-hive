import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import React, { useCallback } from "react";
import getCurrentUser from "./actions/getCurrentUser";
import getItems from "./actions/getItems";
import ItemCard from "./components/items/ItemCard";
import ClientOnly from "./components/ClientOnly";
import moment from "moment"

export default async function Home(props: any) {
  const isHasParams = props.searchParams.category
  const currentUser = await getCurrentUser()
  const items = await getItems()
  const mainCategory = ["Active", "Upcoming", "Finished"]
  const itemsByCategory = items.filter((item) => {
    if (mainCategory.includes(isHasParams)) {
      let res;
      switch (isHasParams) {
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
      if (item.category === isHasParams) {
        return item
      }
    }
  })


  if (items.length === 0 || (isHasParams && itemsByCategory.length === 0)) {
    return (
      <ClientOnly>
        <EmptyState
          showReset
          {...(!isHasParams  && { title:  "Be the first to sell, register your item now !"})}
          {...(!isHasParams  && { subtitle:  "We're sorry, but we don't have any items right now. Register your item or come back at a later time"})}
          currentUser={currentUser}
        />
      </ClientOnly>
    )
  }

  return (
    <Container>
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
        {isHasParams ? (
          itemsByCategory.map((item: any) => {
            return (
              <ItemCard
                currentUser={currentUser}
                key={item.id}
                data={item}
              />
            )
          })
        ) : (
          items.map((item: any) => {
            return (
              <ItemCard
                currentUser={currentUser}
                key={item.id}
                data={item}
              />
            )
          })
        )}
      </div>
    </Container>
  )
}
