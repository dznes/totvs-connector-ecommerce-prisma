/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_code]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_code` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "user_code" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "approved_date" TIMESTAMP(3),
    "cancellation_date" TIMESTAMP(3),
    "currency" TEXT NOT NULL,
    "total_value" DECIMAL(65,30) NOT NULL,
    "installments" INTEGER NOT NULL,
    "installment_values" DECIMAL(65,30) NOT NULL,
    "gateway_name" TEXT NOT NULL,
    "gateway_transaction_id" TEXT,
    "gateway_authorization_code" TEXT,
    "user_gateway_id" TEXT NOT NULL,
    "user_gateway_score" TEXT,
    "user_gateway_card_id" TEXT,
    "payment_type" TEXT NOT NULL,
    "payment_name" TEXT NOT NULL,
    "payment_link" TEXT NOT NULL,
    "payment_card_nsu" TEXT,
    "payment_card_brand" TEXT,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_order_id_key" ON "transactions"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_user_id_key" ON "orders"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_user_code_key" ON "orders"("user_code");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_user_code_fkey" FOREIGN KEY ("user_id", "user_code") REFERENCES "users"("id", "code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
