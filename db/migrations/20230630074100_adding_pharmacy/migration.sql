/*
  Warnings:

  - Added the required column `pharmacy` to the `Pharmacien` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pharmacien" ADD COLUMN     "pharmacy" TEXT NOT NULL;
