import { Bid, Item, User } from "@prisma/client";

export type SafeBid = Omit<Bid, "createdAt"> & {
  createdAt: string;
  user: {
    username: string | null
  } 
}

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "id"
> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}

export type SafeItem = Omit<
  Item,
  "createdAt" | "startDate" | "endDate" | "updatedAt"
> & {
  createdAt: string;
  startDate: string;
  updatedAt: string;
  endDate: string;
  bids?: SafeBid[]
  winner?: {
    username: string | null
    image: string | null
  } | null;
  owner: {
    username: string | null
    image: string | null
  }
}