/*
  Warnings:

  - The `ibge_city_code` column on the `addresses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bcbCountryCode` column on the `addresses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "ibge_city_code",
ADD COLUMN     "ibge_city_code" INTEGER,
DROP COLUMN "bcbCountryCode",
ADD COLUMN     "bcbCountryCode" INTEGER;
