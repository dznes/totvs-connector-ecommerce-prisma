/*
  Warnings:

  - You are about to drop the column `SalesEndDate` on the `skus` table. All the data in the column will be lost.
  - You are about to drop the column `SalesStartDate` on the `skus` table. All the data in the column will be lost.
  - You are about to drop the column `idealStockAmount` on the `skus` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `skus` table. All the data in the column will be lost.
  - You are about to drop the column `isBlocked` on the `skus` table. All the data in the column will be lost.
  - You are about to drop the column `isBulkMaterial` on the `skus` table. All the data in the column will be lost.
  - You are about to drop the column `isFinishedProduct` on the `skus` table. All the data in the column will be lost.
  - You are about to drop the column `isOwnProduction` on the `skus` table. All the data in the column will be lost.
  - You are about to drop the column `isRawMaterial` on the `skus` table. All the data in the column will be lost.
  - You are about to drop the column `maximumStockAmount` on the `skus` table. All the data in the column will be lost.
  - You are about to drop the column `measuredUnit` on the `skus` table. All the data in the column will be lost.
  - You are about to drop the column `minimumStockAmount` on the `skus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "skus" DROP COLUMN "SalesEndDate",
DROP COLUMN "SalesStartDate",
DROP COLUMN "idealStockAmount",
DROP COLUMN "isActive",
DROP COLUMN "isBlocked",
DROP COLUMN "isBulkMaterial",
DROP COLUMN "isFinishedProduct",
DROP COLUMN "isOwnProduction",
DROP COLUMN "isRawMaterial",
DROP COLUMN "maximumStockAmount",
DROP COLUMN "measuredUnit",
DROP COLUMN "minimumStockAmount",
ADD COLUMN     "ideal_stock_amount" DECIMAL(65,30),
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_blocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_bulk_material" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_finished_product" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_own_production" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_raw_material" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maximum_stock_amount" DECIMAL(65,30),
ADD COLUMN     "measured_unit" TEXT,
ADD COLUMN     "minimum_stock_amount" DECIMAL(65,30),
ADD COLUMN     "sales_end_date" TIMESTAMP(3),
ADD COLUMN     "sales_start_date" TIMESTAMP(3);
