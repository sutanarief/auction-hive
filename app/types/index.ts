import { Bid, Item, User, History } from "@prisma/client";

export type SafeBid = Omit<Bid, "createdAt"> & {
  createdAt: string;
  action: string;
  user: {
    username: string | null
  }
  item: {
    id: string;
    title: string;
    isEnded: boolean
  }
}

export type SafeHistory = Omit<History, "createdAt"> & {
  createdAt: string;
  action: string;
  item: {
    id: string;
    title: string,
    isEnded: boolean | false
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
  isEnded: boolean;
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
  [key: string]: any
}