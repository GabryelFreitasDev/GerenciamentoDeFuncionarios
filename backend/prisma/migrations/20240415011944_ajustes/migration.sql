/*
  Warnings:

  - You are about to drop the column `codigo` on the `funcionario` table. All the data in the column will be lost.
  - You are about to drop the column `iddepartamento` on the `funcionario` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "funcionario" DROP CONSTRAINT "funcionario_iddepartamento_fkey";

-- AlterTable
ALTER TABLE "funcionario" DROP COLUMN "codigo",
DROP COLUMN "iddepartamento",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
