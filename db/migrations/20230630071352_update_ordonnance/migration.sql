/*
  Warnings:

  - Added the required column `updatedAt` to the `Ordonnance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE "drug_id_seq";
ALTER TABLE "Drug" ALTER COLUMN "id" SET DEFAULT nextval('drug_id_seq');
ALTER SEQUENCE "drug_id_seq" OWNED BY "Drug"."id";

-- AlterTable
ALTER TABLE "Ordonnance" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
