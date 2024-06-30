/*
  Warnings:

  - You are about to drop the column `bcbCountryCode` on the `addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "bcbCountryCode",
ADD COLUMN     "bcb_country_code" INTEGER,
ALTER COLUMN "neighborhood" DROP NOT NULL;
