/*
  Warnings:

  - You are about to drop the column `birthDate` on the `Medecin` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Medecin` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Medecin` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Medecin` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `Medecin` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Medecin` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Medecin` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Medecin` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `Pharmacien` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Pharmacien` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Pharmacien` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Pharmacien` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `Pharmacien` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Pharmacien` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Pharmacien` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Pharmacien` table. All the data in the column will be lost.
  - You are about to drop the column `medecinId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `pharmacienId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `medecinId` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `pharmacienId` on the `Token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Medecin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupeId]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Pharmacien` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[securityNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Medecin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupeId` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Pharmacien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `securityNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_medecinId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_pharmacienId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_medecinId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_pharmacienId_fkey";

-- DropIndex
DROP INDEX "Medecin_email_key";

-- DropIndex
DROP INDEX "Medecin_phone_key";

-- DropIndex
DROP INDEX "Patient_email_key";

-- DropIndex
DROP INDEX "Patient_phone_key";

-- DropIndex
DROP INDEX "Pharmacien_email_key";

-- DropIndex
DROP INDEX "Pharmacien_phone_key";

-- AlterTable
ALTER TABLE "Medecin" DROP COLUMN "birthDate",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "gender",
DROP COLUMN "hashedPassword",
DROP COLUMN "lastName",
DROP COLUMN "phone",
DROP COLUMN "role",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "birthDate",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "gender",
DROP COLUMN "hashedPassword",
DROP COLUMN "lastName",
DROP COLUMN "phone",
DROP COLUMN "role",
ADD COLUMN     "groupeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pharmacien" DROP COLUMN "birthDate",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "gender",
DROP COLUMN "hashedPassword",
DROP COLUMN "lastName",
DROP COLUMN "phone",
DROP COLUMN "role",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "medecinId",
DROP COLUMN "patientId",
DROP COLUMN "pharmacienId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "medecinId",
DROP COLUMN "patientId",
DROP COLUMN "pharmacienId",
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER',
ADD COLUMN     "securityNumber" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Groupe" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Groupe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medecin_userId_key" ON "Medecin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userId_key" ON "Patient"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_groupeId_key" ON "Patient"("groupeId");

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacien_userId_key" ON "Pharmacien"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_securityNumber_key" ON "User"("securityNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_groupeId_fkey" FOREIGN KEY ("groupeId") REFERENCES "Groupe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medecin" ADD CONSTRAINT "Medecin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pharmacien" ADD CONSTRAINT "Pharmacien_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
