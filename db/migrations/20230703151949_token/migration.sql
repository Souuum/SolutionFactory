/*
  Warnings:

  - You are about to drop the column `hashedToken` on the `TokenOrdonnance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token,type]` on the table `TokenOrdonnance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `TokenOrdonnance` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TokenOrdonnance_hashedToken_type_key";

-- AlterTable
ALTER TABLE "TokenOrdonnance" DROP COLUMN "hashedToken",
ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TokenOrdonnance_token_type_key" ON "TokenOrdonnance"("token", "type");
