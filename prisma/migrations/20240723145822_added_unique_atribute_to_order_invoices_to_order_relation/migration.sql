/*
  Warnings:

  - A unique constraint covering the columns `[order_id]` on the table `order_invoices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_code]` on the table `order_invoices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "order_invoices_order_id_key" ON "order_invoices"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_invoices_order_code_key" ON "order_invoices"("order_code");
