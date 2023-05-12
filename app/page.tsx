import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import React, { useCallback } from "react";
import getCurrentUser from "./actions/getCurrentUser";
import getItems from "./actions/getItems";
import ItemCard from "./components/items/ItemCard";
import ClientOnly from "./components/ClientOnly";

export default async function Home(props: any) {
  const isHasParams = props.searchParams.category
  const currentUser = await getCurrentUser()
  const items = await getItems()

  if (items.length === 0) {
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
        {items.map((item: any) => {
          return (
            <ItemCard
              currentUser={currentUser}
              key={item.id}
              data={item}
            />
          )
        })}
      </div>
    </Container>
  )
}
