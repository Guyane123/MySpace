/*
  Warnings:

  - You are about to drop the column `postId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `parrentId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_postId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postId",
ADD COLUMN     "parrentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_parrentId_fkey" FOREIGN KEY ("parrentId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
