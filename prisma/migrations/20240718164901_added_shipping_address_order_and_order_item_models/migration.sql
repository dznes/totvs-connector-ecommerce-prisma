-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "type" INTEGER NOT NULL,
    "items_quantity" INTEGER NOT NULL,
    "total_items" INTEGER NOT NULL,
    "discount_value" DECIMAL(65,30) NOT NULL,
    "total_value" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "utm_campaign" TEXT,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_content" TEXT,
    "utm_term" TEXT,
    "fiscal_code" TEXT,
    "gateway_id" TEXT,
    "order_vtex_id" TEXT,
    "totvs_branch_code" INTEGER,
    "totvs_creation_date" TIMESTAMP(3),
    "representative_code" TEXT,
    "representative_name" TEXT,
    "operation_code" TEXT,
    "operation_name" TEXT,
    "payment_condition_code" TEXT,
    "payment_condition_name" TEXT,
    "freight_type" INTEGER,
    "freight_value" DECIMAL(65,30),
    "shipping_company_code" TEXT,
    "shipping_company_cnpj" TEXT,
    "shipping_company_name" TEXT,
    "shipping_service_cod" TEXT,
    "shipping_service_name" TEXT,
    "totvs_order_status" TEXT,
    "user_id" TEXT NOT NULL,
    "shipping_address_id" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_addresses" (
    "id" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 200,
    "type" TEXT,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "neighborhood" TEXT,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "complement" TEXT,
    "ibge_city_code" INTEGER,
    "bcb_country_code" INTEGER,

    CONSTRAINT "shipping_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "product_code" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_reference_code" TEXT NOT NULL,
    "product_reference_name" TEXT NOT NULL,
    "product_sku_code" TEXT NOT NULL,
    "color_code" TEXT NOT NULL,
    "color_name" TEXT NOT NULL,
    "size_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "to_settle_quantity" INTEGER,
    "settled_quantity" INTEGER,
    "canceled_quantity" INTEGER,
    "extra_quantity" INTEGER,
    "pending_quantity" INTEGER,
    "original_price" DECIMAL(65,30),
    "price" DECIMAL(65,30),
    "discount_percentage" DOUBLE PRECISION,
    "last_changed_at" TIMESTAMP(3),
    "totvs_creation_date" TIMESTAMP(3),

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderToOrderItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_code_key" ON "orders"("code");

-- CreateIndex
CREATE UNIQUE INDEX "orders_shipping_address_id_key" ON "orders"("shipping_address_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_code_id_key" ON "orders"("code", "id");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToOrderItem_AB_unique" ON "_OrderToOrderItem"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToOrderItem_B_index" ON "_OrderToOrderItem"("B");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "shipping_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToOrderItem" ADD CONSTRAINT "_OrderToOrderItem_A_fkey" FOREIGN KEY ("A") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToOrderItem" ADD CONSTRAINT "_OrderToOrderItem_B_fkey" FOREIGN KEY ("B") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
