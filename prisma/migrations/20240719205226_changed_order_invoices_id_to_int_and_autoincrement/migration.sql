/*
  Warnings:

  - The primary key for the `order_invoices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `order_invoices` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "order_invoices" DROP CONSTRAINT "order_invoices_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "order_invoices_pkey" PRIMARY KEY ("id");
