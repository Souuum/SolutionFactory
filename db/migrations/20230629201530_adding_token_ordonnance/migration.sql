-- CreateTable
CREATE TABLE "TokenOrdonnance" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "sentTo" TEXT NOT NULL,
    "ordonnanceId" INTEGER,

    CONSTRAINT "TokenOrdonnance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenOrdonnance_ordonnanceId_key" ON "TokenOrdonnance"("ordonnanceId");

-- CreateIndex
CREATE UNIQUE INDEX "TokenOrdonnance_hashedToken_type_key" ON "TokenOrdonnance"("hashedToken", "type");

-- AddForeignKey
ALTER TABLE "TokenOrdonnance" ADD CONSTRAINT "TokenOrdonnance_ordonnanceId_fkey" FOREIGN KEY ("ordonnanceId") REFERENCES "Ordonnance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
