/*
  Warnings:

  - You are about to drop the column `birthDate` on the `SubUser` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `SubUser` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `SubUser` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SubUser` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubUser" DROP COLUMN "birthDate",
DROP COLUMN "firstName",
DROP COLUMN "gender",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
