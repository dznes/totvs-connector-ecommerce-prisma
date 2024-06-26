-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 200,
    "title" TEXT NOT NULL,
    "variation_type" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "background_color" TEXT,
    "image_tags" TEXT,
    "image_url" TEXT,
    "image_text" TEXT,
    "image_label" TEXT,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 200,
    "title" TEXT NOT NULL,
    "variation_type" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 200,
    "title" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "ncm" TEXT NOT NULL,
    "mpn" TEXT,
    "ean" TEXT,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price_wholesale" DECIMAL(65,30),
    "price_retail" DECIMAL(65,30),
    "cost" DECIMAL(65,30),
    "package_weight" DOUBLE PRECISION,
    "package_height" DOUBLE PRECISION,
    "package_length" DOUBLE PRECISION,
    "package_width" DOUBLE PRECISION,
    "updated_at" TIMESTAMP(3),
    "discount_percentage" DOUBLE PRECISION,
    "reference_id" TEXT,
    "reference_name" TEXT,
    "integration_code" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skus" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 200,
    "title" TEXT NOT NULL,
    "mpn" TEXT,
    "ncm" TEXT NOT NULL,
    "ean" TEXT,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price_wholesale" DECIMAL(65,30),
    "price_retail" DECIMAL(65,30),
    "cost" DECIMAL(65,30),
    "balance" INTEGER NOT NULL DEFAULT 0,
    "discount_percentage" DOUBLE PRECISION,
    "reference_id" TEXT,
    "reference_name" TEXT,
    "integration_code" TEXT,
    "quantity_op" INTEGER,
    "updated_at" TIMESTAMP(3),
    "product_id" INTEGER,
    "color_code" TEXT NOT NULL,
    "size_code" TEXT NOT NULL,

    CONSTRAINT "skus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 200,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToSku" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Color_code_key" ON "Color"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Size_code_key" ON "Size"("code");

-- CreateIndex
CREATE UNIQUE INDEX "products_title_key" ON "products"("title");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "skus_code_key" ON "skus"("code");

-- CreateIndex
CREATE UNIQUE INDEX "skus_slug_key" ON "skus"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_title_key" ON "categories"("title");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToSku_AB_unique" ON "_CategoryToSku"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToSku_B_index" ON "_CategoryToSku"("B");

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_color_code_fkey" FOREIGN KEY ("color_code") REFERENCES "Color"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_size_code_fkey" FOREIGN KEY ("size_code") REFERENCES "Size"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSku" ADD CONSTRAINT "_CategoryToSku_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSku" ADD CONSTRAINT "_CategoryToSku_B_fkey" FOREIGN KEY ("B") REFERENCES "skus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
