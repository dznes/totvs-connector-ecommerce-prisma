-- AlterTable
ALTER TABLE "Color" ALTER COLUMN "variation_type" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Size" ALTER COLUMN "variation_type" SET DEFAULT 2;

-- AlterTable
ALTER TABLE "skus" ADD COLUMN     "SalesEndDate" TIMESTAMP(3),
ADD COLUMN     "SalesStartDate" TIMESTAMP(3),
ADD COLUMN     "idealStockAmount" DECIMAL(65,30),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isBulkMaterial" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFinishedProduct" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isOwnProduction" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRawMaterial" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maximumStockAmount" DECIMAL(65,30),
ADD COLUMN     "measuredUnit" TEXT,
ADD COLUMN     "minimumStockAmount" DECIMAL(65,30);
