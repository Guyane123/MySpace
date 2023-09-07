/*
  Warnings:

  - You are about to drop the column `parrentId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_parrentId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "parrentId",
ADD COLUMN     "postId" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
