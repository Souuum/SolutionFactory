/*
  Warnings:

  - Added the required column `afternoon` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evening` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expirationTime` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasTakenAfternoon` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasTakenEvening` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasTakenMorning` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `morning` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prescription" ADD COLUMN     "afternoon" INTEGER NOT NULL,
ADD COLUMN     "evening" INTEGER NOT NULL,
ADD COLUMN     "expirationTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hasTakenAfternoon" BOOLEAN NOT NULL,
ADD COLUMN     "hasTakenEvening" BOOLEAN NOT NULL,
ADD COLUMN     "hasTakenMorning" BOOLEAN NOT NULL,
ADD COLUMN     "morning" INTEGER NOT NULL;
