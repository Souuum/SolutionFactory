/*
  Warnings:

  - You are about to drop the column `userId` on the `Medecin` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `securityNumber` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Medecin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Medecin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Pharmacien` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Pharmacien` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birthDate` to the `Medecin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Medecin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Medecin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Medecin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `Medecin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Medecin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Medecin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `Pharmacien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Pharmacien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Pharmacien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Pharmacien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `Pharmacien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Pharmacien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Pharmacien` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Medecin" DROP CONSTRAINT "Medecin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Pharmacien" DROP CONSTRAINT "Pharmacien_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- DropIndex
DROP INDEX "Medecin_userId_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_phone_key";

-- DropIndex
DROP INDEX "User_securityNumber_key";

-- AlterTable
ALTER TABLE "Medecin" DROP COLUMN "userId",
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'SUPERUSER';

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'SUPERUSER';

-- AlterTable
ALTER TABLE "Pharmacien" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'SUPERUSER';

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "userId",
ADD COLUMN     "medecinId" INTEGER,
ADD COLUMN     "patientId" INTEGER,
ADD COLUMN     "pharmacienId" INTEGER;

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "userId",
ADD COLUMN     "medecinId" INTEGER,
ADD COLUMN     "patientId" INTEGER,
ADD COLUMN     "pharmacienId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthDate",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "gender",
DROP COLUMN "hashedPassword",
DROP COLUMN "lastName",
DROP COLUMN "phone",
DROP COLUMN "role",
DROP COLUMN "securityNumber";

-- CreateIndex
CREATE UNIQUE INDEX "Medecin_email_key" ON "Medecin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Medecin_phone_key" ON "Medecin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_phone_key" ON "Patient"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacien_email_key" ON "Pharmacien"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacien_phone_key" ON "Pharmacien"("phone");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_pharmacienId_fkey" FOREIGN KEY ("pharmacienId") REFERENCES "Pharmacien"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_pharmacienId_fkey" FOREIGN KEY ("pharmacienId") REFERENCES "Pharmacien"("id") ON DELETE SET NULL ON UPDATE CASCADE;
