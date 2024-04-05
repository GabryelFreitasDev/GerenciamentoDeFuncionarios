/*
  Warnings:

  - You are about to drop the column `password` on the `usuario` table. All the data in the column will be lost.
  - You are about to alter the column `nome` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `email` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - Added the required column `login` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "password",
ADD COLUMN     "login" VARCHAR(100) NOT NULL,
ADD COLUMN     "senha" VARCHAR(100) NOT NULL,
ALTER COLUMN "nome" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;
