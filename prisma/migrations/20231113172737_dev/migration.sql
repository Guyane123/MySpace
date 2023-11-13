/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `saveSubscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "saveSubscription" ALTER COLUMN "p256dhKey" SET NOT NULL,
ALTER COLUMN "p256dhKey" SET DATA TYPE TEXT,
ALTER COLUMN "authKey" SET NOT NULL,
ALTER COLUMN "authKey" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "saveSubscription_authorId_key" ON "saveSubscription"("authorId");
