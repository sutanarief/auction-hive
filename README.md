# Auction-Hive
<!--- These are examples. See https://shields.io for others or to customize this set of shields. You might want to include dependencies, project status and licence info here --->
![GitHub repo size](https://img.shields.io/github/repo-size/sutanarief/auction-hive?style=plastic)
![Github languange](https://img.shields.io/github/languages/top/sutanarief/auction-hive?logo=go&style=plastic)
![GitHub contributors](https://img.shields.io/github/contributors/sutanarief/auction-hive?style=plastic)
![GitHub stars](https://img.shields.io/github/stars/sutanarief/auction-hive?style=social)
![GitHub forks](https://img.shields.io/github/forks/sutanarief/auction-hive?style=social)

Auction-Hive is an online auction platform revolutionizing buying and selling valuable items with a
user-friendly interface, fair bidding process, and diverse categories..

# Live Demo

You can check the live demo [Here](https://auction-hive.vercel.app)

# Prerequisites

Before you begin, ensure you have met the following requirements:
* Node version =>19.8 | [Download Here](https://nodejs.org/en)
* MongoDB Atlas Account | [Create Here](https://www.mongodb.com/cloud/atlas/register)
* Cloudinary Cloud | [Create Here](https://cloudinary.com/)

# Using auction-hive
Add .env file with these variables
```env
DATABASE_URL=<MongoDB Atlas connecting string>
NEXTAUTH_SECRET=<YOURSECRETPHRASE>

GITHUB_ID=<GITHUB_CLIENT_ID_OAUTH>
GITHUB_SECRET=<GITHUB_CLIENT_SECRET_OAUTH>

GOOGLE_ID=<GOOGLE_ID_OAUTH>
GOOGLE_SECRET=<GOOGLE_SECRET_OAUTH>

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<CLOUDINARY CLOUD NAME>
```

Installing dependencies :
```
npm install
```
Run application :
```
npm run start
```

# To Do

* Make the search bar works
* Try to implement queue for user bid's or buyouts
* Fix trigger function in mongoDB Atlas, for change the item status (active/unactive)

# Secondary To do
* Bidder rank
* Highest sold item rank
