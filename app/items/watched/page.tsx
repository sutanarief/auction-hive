import React from 'react';

import Container from '@/app/components/Container';
import EmptyState from '@/app/components/EmptyState';
import ItemClient from './ItemClient';
import getCurrentUser from '@/app/actions/getCurrentUser';


const MyItems = async () => {
  const currentUser = await getCurrentUser()

  if(currentUser?.watchedItems.length === 0) {
    return (
      <Container>
        <EmptyState
          showReset
          title='Your Watchlist is Empty, Dive Into Exciting Items and Begin Your Viewing Journey'
          subtitle="Explore unwatched gems and uncover hidden riches"
          label='Back to Home'
        />
      </Container>
    )
  }
  
  return (
      <Container>
          <ItemClient currentUser={currentUser} />
      </Container>
  )
}
export default MyItems;