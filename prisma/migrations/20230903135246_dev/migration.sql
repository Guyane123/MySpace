/*
  Warnings:

  - The primary key for the `Comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `autoIncrementId` on the `Comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_pkey",
DROP COLUMN "autoIncrementId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Comments_pkey" PRIMARY KEY ("id");
