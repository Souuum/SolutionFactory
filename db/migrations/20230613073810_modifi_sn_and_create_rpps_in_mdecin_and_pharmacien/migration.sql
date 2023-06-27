/*
  Warnings:

  - You are about to drop the column `securityNumber` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rpps]` on the table `Medecin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rpps]` on the table `Pharmacien` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rpps` to the `Medecin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `securityNumber` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rpps` to the `Pharmacien` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_securityNumber_key";

-- AlterTable
ALTER TABLE "Medecin" ADD COLUMN     "rpps" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "securityNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pharmacien" ADD COLUMN     "rpps" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "securityNumber";

-- CreateIndex
CREATE UNIQUE INDEX "Medecin_rpps_key" ON "Medecin"("rpps");

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacien_rpps_key" ON "Pharmacien"("rpps");
