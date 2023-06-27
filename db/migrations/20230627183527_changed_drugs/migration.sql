/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Drug` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Drug` table. All the data in the column will be lost.
  - Added the required column `ammDate` to the `Drug` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ammProcType` to the `Drug` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ammStatus` to the `Drug` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bdmStatus` to the `Drug` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commercial` to the `Drug` table without a default value. This is not possible if the table is not empty.
  - Added the required column `euroAutorization` to the `Drug` table without a default value. This is not possible if the table is not empty.
  - Added the required column `holder` to the `Drug` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monitoring` to the `Drug` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drug" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "ammDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ammProcType" TEXT NOT NULL,
ADD COLUMN     "ammStatus" TEXT NOT NULL,
ADD COLUMN     "bdmStatus" TEXT NOT NULL,
ADD COLUMN     "commercial" TEXT NOT NULL,
ADD COLUMN     "euroAutorization" TEXT NOT NULL,
ADD COLUMN     "holder" TEXT NOT NULL,
ADD COLUMN     "monitoring" BOOLEAN NOT NULL,
ADD COLUMN     "pharmaShape" TEXT[],
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Drug_id_seq";
