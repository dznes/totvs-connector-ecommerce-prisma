/*
  Warnings:

  - You are about to drop the column `shipping_address_id` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id,order_code]` on the table `shipping_addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_code` to the `shipping_addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `shipping_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_shipping_address_id_fkey";

-- DropIndex
DROP INDEX "orders_shipping_address_id_key";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "shipping_address_id";

-- AlterTable
ALTER TABLE "shipping_addresses" ADD COLUMN     "order_code" TEXT NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "shipping_addresses_order_id_order_code_key" ON "shipping_addresses"("order_id", "order_code");

-- AddForeignKey
ALTER TABLE "shipping_addresses" ADD CONSTRAINT "shipping_addresses_order_id_order_code_fkey" FOREIGN KEY ("order_id", "order_code") REFERENCES "orders"("id", "code") ON DELETE RESTRICT ON UPDATE CASCADE;
