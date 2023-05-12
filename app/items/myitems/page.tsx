'use client'

import React from 'react';

import Button from '@/app/components/Button';
import Container from '@/app/components/Container';
import EmptyState from '@/app/components/EmptyState';

type myItemsProps = {
  
};

const MyItems:React.FC<myItemsProps> = () => {
  const isEmpty = true

  if(isEmpty) {
    return (
      <Container>
        <EmptyState
          showReset
          title='Take your selling to the next level, register your item in our auction today!'
          subtitle="No items found for auction in your account. It's easy to list an item for auction"
          label='Register Item'
        />
      </Container>
    )
  }
  
  return (
    <Container>
      <div
        className="
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
        <div>My personal Items</div>
      </div>
    </Container>
  )
}
export default MyItems;