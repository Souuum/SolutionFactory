/*
  Warnings:

  - You are about to drop the column `name` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "name",
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastname",
ADD COLUMN     "lastName" TEXT NOT NULL;