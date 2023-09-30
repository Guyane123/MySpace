/*
  Warnings:

  - You are about to drop the column `messageId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `messagerId` on the `Notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_messageId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_messagerId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "messageId",
DROP COLUMN "messagerId",
ADD COLUMN     "conversaterId" TEXT,
ADD COLUMN     "conversatingId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_conversatingId_conversaterId_fkey" FOREIGN KEY ("conversatingId", "conversaterId") REFERENCES "Conversations"("conversatingId", "conversaterId") ON DELETE CASCADE ON UPDATE CASCADE;
