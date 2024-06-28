-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 200,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "regitered_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rg" TEXT,
    "birthDate" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "postal_code" TEXT,
    "cpf" TEXT,
    "cnpj" TEXT,
    "gender" TEXT,
    "is_customer" BOOLEAN NOT NULL DEFAULT false,
    "is_supplier" BOOLEAN NOT NULL DEFAULT false,
    "is_representative" BOOLEAN NOT NULL DEFAULT false,
    "is_shipping_company" BOOLEAN NOT NULL DEFAULT false,
    "is_employee" BOOLEAN NOT NULL DEFAULT false,
    "employee_status" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 200,
    "type" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "complement" TEXT,
    "ibge_city_code" TEXT,
    "bcbCountryCode" TEXT,
    "user_code" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telephones" (
    "id" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 200,
    "type" TEXT NOT NULL,
    "ddd_code" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_code" TEXT NOT NULL,

    CONSTRAINT "telephones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_code_key" ON "users"("code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_code_fkey" FOREIGN KEY ("user_code") REFERENCES "users"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telephones" ADD CONSTRAINT "telephones_user_code_fkey" FOREIGN KEY ("user_code") REFERENCES "users"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
