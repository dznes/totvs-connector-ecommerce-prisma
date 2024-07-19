-- CreateTable
CREATE TABLE "order_invoices" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "access_key" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "shipping_company_name" TEXT NOT NULL,
    "package_number" TEXT NOT NULL,
    "gross_weight" DOUBLE PRECISION NOT NULL,
    "net_weight" DOUBLE PRECISION NOT NULL,
    "tracking_code" TEXT NOT NULL,
    "discount_percentage" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "product_value" DECIMAL(65,30) NOT NULL,
    "additional_value" DECIMAL(65,30) NOT NULL,
    "shipping_value" DECIMAL(65,30) NOT NULL,
    "insurance_value" DECIMAL(65,30) NOT NULL,
    "ipi_value" DECIMAL(65,30) NOT NULL,
    "total_value" DECIMAL(65,30) NOT NULL,
    "transaction_branch_code" TEXT NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "transaction_code" TEXT NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "order_id" TEXT NOT NULL,
    "order_code" TEXT NOT NULL,

    CONSTRAINT "order_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_invoices_code_key" ON "order_invoices"("code");

-- CreateIndex
CREATE UNIQUE INDEX "order_invoices_order_id_key" ON "order_invoices"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_invoices_order_code_key" ON "order_invoices"("order_code");

-- AddForeignKey
ALTER TABLE "order_invoices" ADD CONSTRAINT "order_invoices_order_id_order_code_fkey" FOREIGN KEY ("order_id", "order_code") REFERENCES "orders"("id", "code") ON DELETE RESTRICT ON UPDATE CASCADE;
