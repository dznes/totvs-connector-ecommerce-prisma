-- CreateTable
CREATE TABLE "product_images" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "file_key" TEXT NOT NULL,
    "slug" TEXT,
    "content_type" TEXT,
    "position" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "sku_code" TEXT NOT NULL,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_images_position_sku_code_key" ON "product_images"("position", "sku_code");

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_sku_code_fkey" FOREIGN KEY ("sku_code") REFERENCES "skus"("code") ON DELETE CASCADE ON UPDATE CASCADE;
