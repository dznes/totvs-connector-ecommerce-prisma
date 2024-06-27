/*
  Warnings:

  - You are about to drop the column `balance` on the `skus` table. All the data in the column will be lost.
  - You are about to drop the column `quantity_op` on the `skus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "skus" DROP COLUMN "balance",
DROP COLUMN "quantity_op",
ADD COLUMN     "stock_available" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stock_order_production" INTEGER NOT NULL DEFAULT 0;
