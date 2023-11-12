/*
  Warnings:

  - You are about to drop the column `pushNotification` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "pushNotification";

-- CreateTable
CREATE TABLE "saveSubscription" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endpoint" TEXT NOT NULL,
    "p256dhKey" TEXT NOT NULL,
    "authKey" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "saveSubscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "saveSubscription" ADD CONSTRAINT "saveSubscription_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
