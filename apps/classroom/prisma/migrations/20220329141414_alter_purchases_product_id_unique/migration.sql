/*
  Warnings:

  - A unique constraint covering the columns `[purchasesProductId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_purchasesProductId_key" ON "Course"("purchasesProductId");
