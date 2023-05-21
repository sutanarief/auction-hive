export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/balance/:path*",
    "/items/watched",
    "/items/myitems",
  ]
}