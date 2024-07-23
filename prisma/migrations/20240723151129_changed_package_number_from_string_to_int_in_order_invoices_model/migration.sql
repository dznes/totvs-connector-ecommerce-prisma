/*
  Warnings:

  - Changed the type of `package_number` on the `order_invoices` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "order_invoices" DROP COLUMN "package_number",
ADD COLUMN     "package_number" INTEGER NOT NULL;
