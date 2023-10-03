/*
  Warnings:

  - You are about to drop the column `conversationId` on the `Messages` table. All the data in the column will be lost.
  - Added the required column `conversaterId` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conversatingId` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "conversationId",
ADD COLUMN     "conversaterId" TEXT NOT NULL,
ADD COLUMN     "conversatingId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_conversaterId_conversatingId_fkey" FOREIGN KEY ("conversaterId", "conversatingId") REFERENCES "Conversations"("conversatingId", "conversaterId") ON DELETE RESTRICT ON UPDATE CASCADE;
