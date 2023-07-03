/*
  Warnings:

  - Added the required column `codePostal` to the `Medecin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medecin" ADD COLUMN     "codePostal" INTEGER NOT NULL;
