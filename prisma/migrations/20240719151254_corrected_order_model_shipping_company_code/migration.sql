/*
  Warnings:

  - You are about to drop the column `shipping_service_cod` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "shipping_service_cod",
ADD COLUMN     "shipping_service_code" TEXT;
