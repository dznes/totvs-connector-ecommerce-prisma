/*
  Warnings:

  - A unique constraint covering the columns `[code,type_code]` on the table `classifications` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "classifications_code_key";

-- CreateIndex
CREATE UNIQUE INDEX "classifications_code_type_code_key" ON "classifications"("code", "type_code");
