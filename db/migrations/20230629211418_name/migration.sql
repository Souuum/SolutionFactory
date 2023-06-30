/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Groupe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Groupe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Groupe" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Groupe_name_key" ON "Groupe"("name");
