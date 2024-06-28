/*
  Warnings:

  - A unique constraint covering the columns `[code,id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `telephones` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_user_code_fkey";

-- DropForeignKey
ALTER TABLE "telephones" DROP CONSTRAINT "telephones_user_code_fkey";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "telephones" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_code_id_key" ON "users"("code", "id");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_code_user_id_fkey" FOREIGN KEY ("user_code", "user_id") REFERENCES "users"("code", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telephones" ADD CONSTRAINT "telephones_user_code_user_id_fkey" FOREIGN KEY ("user_code", "user_id") REFERENCES "users"("code", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
