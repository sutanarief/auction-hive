import React from 'react';

import Container from '@/app/components/Container';
import EmptyState from '@/app/components/EmptyState';
import getItemByUserId from '@/app/actions/getItemByUserId';
import ItemClient from './ItemClient';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';

type IParams = {
  userId: string
}

const MyItems = async ({ params }: {params: IParams}) => {
  const userItem = await getItemByUserId(params)
  const currentUser = await getCurrentUser()

  if(userItem.length === 0) {
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
          <ItemClient currentUser={currentUser} items={userItem}/>
      </Container>
  )
}
export default MyItems;