/*
  Warnings:

  - Changed the type of `p256dhKey` on the `saveSubscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `authKey` on the `saveSubscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "saveSubscription" DROP COLUMN "p256dhKey",
ADD COLUMN     "p256dhKey" BYTEA NOT NULL,
DROP COLUMN "authKey",
ADD COLUMN     "authKey" BYTEA NOT NULL;
