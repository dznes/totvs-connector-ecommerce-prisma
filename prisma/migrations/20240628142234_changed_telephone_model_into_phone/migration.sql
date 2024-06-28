/*
  Warnings:

  - You are about to drop the `telephones` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "telephones" DROP CONSTRAINT "telephones_user_code_user_id_fkey";

-- DropTable
DROP TABLE "telephones";

-- CreateTable
CREATE TABLE "phones" (
    "id" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 200,
    "type" TEXT NOT NULL,
    "ddd_code" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_code" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "phones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "phones_user_code_user_id_fkey" FOREIGN KEY ("user_code", "user_id") REFERENCES "users"("code", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
