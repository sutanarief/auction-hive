import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'

import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import ItemModal from './components/modals/ItemModal'
import ClientOnly from './components/ClientOnly'
import BidInfoModal from './components/modals/BidInfoModal'
import BidModal from './components/modals/BidModal'


const font = Nunito({
  subsets: ["latin"],
  weight: "400",
})

export const metadata = {
  title: 'Auction Hive',
  description: 'Online Live Auction',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <BidInfoModal />
          <BidModal currentUser={currentUser} />
          <ItemModal currentUser={currentUser} />
          <Navbar currentUser={currentUser} />
          <div className='pb-20 pt-28'>
            {children}
          </div>
        </ClientOnly>
        </body>
    </html>
  )
}
