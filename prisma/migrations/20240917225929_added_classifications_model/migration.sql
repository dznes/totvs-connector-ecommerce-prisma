-- CreateTable
CREATE TABLE "classifications" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "type_code" TEXT NOT NULL,
    "type_name" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 200,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "classifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassificationToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClassificationToSku" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "classifications_code_key" ON "classifications"("code");

-- CreateIndex
CREATE UNIQUE INDEX "classifications_title_key" ON "classifications"("title");

-- CreateIndex
CREATE UNIQUE INDEX "classifications_slug_key" ON "classifications"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassificationToProduct_AB_unique" ON "_ClassificationToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassificationToProduct_B_index" ON "_ClassificationToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassificationToSku_AB_unique" ON "_ClassificationToSku"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassificationToSku_B_index" ON "_ClassificationToSku"("B");

-- AddForeignKey
ALTER TABLE "_ClassificationToProduct" ADD CONSTRAINT "_ClassificationToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "classifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassificationToProduct" ADD CONSTRAINT "_ClassificationToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassificationToSku" ADD CONSTRAINT "_ClassificationToSku_A_fkey" FOREIGN KEY ("A") REFERENCES "classifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassificationToSku" ADD CONSTRAINT "_ClassificationToSku_B_fkey" FOREIGN KEY ("B") REFERENCES "skus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
