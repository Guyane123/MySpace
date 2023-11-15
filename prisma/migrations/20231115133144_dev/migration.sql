/*
  Warnings:

  - You are about to drop the column `bannerImageSrc` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_bannerImageSrc_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_image_fkey";

-- DropIndex
DROP INDEX "Image_binary_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bannerImageSrc",
ADD COLUMN     "bannerImageId" TEXT,
ALTER COLUMN "image" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_image_fkey" FOREIGN KEY ("image") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
