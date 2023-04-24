import { Nunito } from 'next/font/google'
import './globals.css'


const font = Nunito({
  subsets: ["latin"],
  weight: "400",
})

export const metadata = {
  title: 'Auction Hive',
  description: 'Online Live Auction',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
