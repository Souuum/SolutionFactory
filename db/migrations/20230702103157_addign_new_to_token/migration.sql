-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "groupeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_groupeId_fkey" FOREIGN KEY ("groupeId") REFERENCES "Groupe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
