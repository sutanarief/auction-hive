'use client';

import Image from "next/image";
import { useRouter } from "next/navigation"

const Logo = () => {
  const router = useRouter();

  return (
    <div
      className="flex gap-2 cursor-pointer"
    >
      <Image 
        alt="logo"
        className="hidden sm:hidden md:hidden lg:block"
        width="50"
        height="50"
        src="/hive.svg"
      />
      <span
        className="
          text-3xl
          self-center
          hidden
          md:block
        "
      >
        Auction<span className="text-yellow-400 font-extrabold">Hive</span>
      </span>
    </div>
  )
}

export default Logo