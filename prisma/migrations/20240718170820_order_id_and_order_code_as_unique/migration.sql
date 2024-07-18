/*
  Warnings:

  - A unique constraint covering the columns `[order_id]` on the table `shipping_addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_code]` on the table `shipping_addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shipping_addresses_order_id_key" ON "shipping_addresses"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "shipping_addresses_order_code_key" ON "shipping_addresses"("order_code");
