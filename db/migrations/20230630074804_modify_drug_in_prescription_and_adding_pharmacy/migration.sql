/*
  Warnings:

  - You are about to drop the column `drugId` on the `Prescription` table. All the data in the column will be lost.
  - Added the required column `drug` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prescription" DROP CONSTRAINT "Prescription_drugId_fkey";

-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "drugId",
ADD COLUMN     "drug" TEXT NOT NULL;
