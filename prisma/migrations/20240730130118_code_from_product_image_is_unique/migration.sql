/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `product_images` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_images_code_key" ON "product_images"("code");
