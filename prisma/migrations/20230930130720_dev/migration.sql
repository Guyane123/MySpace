-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "conversatingId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_conversatingId_fkey" FOREIGN KEY ("conversatingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
