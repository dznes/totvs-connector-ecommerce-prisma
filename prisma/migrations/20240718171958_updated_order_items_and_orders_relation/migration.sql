/*
  Warnings:

  - You are about to drop the column `last_changed_at` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `totvs_creation_date` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the `_OrderToOrderItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[order_id]` on the table `order_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_code]` on the table `order_items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_code` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderToOrderItem" DROP CONSTRAINT "_OrderToOrderItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToOrderItem" DROP CONSTRAINT "_OrderToOrderItem_B_fkey";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "last_changed_at",
DROP COLUMN "totvs_creation_date",
ADD COLUMN     "order_code" TEXT NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "totvs_created_at" TIMESTAMP(3),
ADD COLUMN     "totvs_updated_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "_OrderToOrderItem";

-- CreateIndex
CREATE UNIQUE INDEX "order_items_order_id_key" ON "order_items"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_items_order_code_key" ON "order_items"("order_code");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_order_code_fkey" FOREIGN KEY ("order_id", "order_code") REFERENCES "orders"("id", "code") ON DELETE RESTRICT ON UPDATE CASCADE;
