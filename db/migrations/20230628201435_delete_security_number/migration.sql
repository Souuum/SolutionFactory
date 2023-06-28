/*
  Warnings:

  - You are about to drop the column `securityNumber` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_securityNumber_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "securityNumber";
