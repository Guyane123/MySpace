/*
  Warnings:

  - You are about to drop the column `bannerImageId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_bannerImageId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_image_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bannerImageId",
DROP COLUMN "image",
ADD COLUMN     "bannerImage" TEXT DEFAULT 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg',
ADD COLUMN     "userImage" TEXT DEFAULT 'https://thispersondoesnotexist.com';
