/*
  Warnings:

  - You are about to drop the column `role` on the `Medecin` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Pharmacien` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Medecin" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Pharmacien" DROP COLUMN "role";
