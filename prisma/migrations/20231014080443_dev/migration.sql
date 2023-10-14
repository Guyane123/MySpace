-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_conversaterId_conversatingId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bannerImage" TEXT;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_conversaterId_conversatingId_fkey" FOREIGN KEY ("conversaterId", "conversatingId") REFERENCES "Conversations"("conversaterId", "conversatingId") ON DELETE RESTRICT ON UPDATE CASCADE;
