/*
  Warnings:

  - The `p256dhKey` column on the `saveSubscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `authKey` column on the `saveSubscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "saveSubscription" DROP COLUMN "p256dhKey",
ADD COLUMN     "p256dhKey" INTEGER[],
DROP COLUMN "authKey",
ADD COLUMN     "authKey" INTEGER[];
