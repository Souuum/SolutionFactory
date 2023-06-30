/*
  Warnings:

  - You are about to drop the column `userId` on the `Pharmacien` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Pharmacien_userId_key";

-- AlterTable
ALTER TABLE "Pharmacien" DROP COLUMN "userId";
