/*
  Warnings:

  - You are about to drop the column `conversatingId` on the `Notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_conversatingId_conversaterId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "conversatingId";

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_conversaterId_fkey" FOREIGN KEY ("conversaterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
