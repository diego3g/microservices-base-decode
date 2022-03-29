/*
  Warnings:

  - A unique constraint covering the columns `[purchasesEnrolledByPurchaseId]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "purchasesEnrolledByPurchaseId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_purchasesEnrolledByPurchaseId_key" ON "Enrollment"("purchasesEnrolledByPurchaseId");
