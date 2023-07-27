/*
  Warnings:

  - The primary key for the `chapters` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `genders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `mangas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sinopse` on the `mangas` table. All the data in the column will be lost.
  - The `status` column on the `mangas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `rate_mangas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[slug]` on the table `mangas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,author]` on the table `mangas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `chapters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `chapters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `mangas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `synopsis` to the `mangas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `mangas` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ongoing', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'mod', 'admin');

-- DropForeignKey
ALTER TABLE "_GenderToManga" DROP CONSTRAINT "_GenderToManga_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenderToManga" DROP CONSTRAINT "_GenderToManga_B_fkey";

-- DropForeignKey
ALTER TABLE "chapters" DROP CONSTRAINT "chapters_mangaId_fkey";

-- DropForeignKey
ALTER TABLE "rate_mangas" DROP CONSTRAINT "rate_mangas_mangaId_fkey";

-- DropForeignKey
ALTER TABLE "rate_mangas" DROP CONSTRAINT "rate_mangas_userId_fkey";

-- AlterTable
ALTER TABLE "_GenderToManga" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "chapters" DROP CONSTRAINT "chapters_pkey",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "createdById" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "mangaId" SET DATA TYPE TEXT,
ADD CONSTRAINT "chapters_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "chapters_id_seq";

-- AlterTable
ALTER TABLE "genders" DROP CONSTRAINT "genders_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "genders_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "genders_id_seq";

-- AlterTable
ALTER TABLE "mangas" DROP CONSTRAINT "mangas_pkey",
DROP COLUMN "sinopse",
ADD COLUMN     "releaseDate" TIMESTAMP(3),
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "synopsis" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "author" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" DEFAULT 'ongoing',
ADD CONSTRAINT "mangas_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "mangas_id_seq";

-- AlterTable
ALTER TABLE "rate_mangas" DROP CONSTRAINT "rate_mangas_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "mangaId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "rate_mangas_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "rate_mangas_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "mangas_slug_key" ON "mangas"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "mangas_title_author_key" ON "mangas"("title", "author");

-- AddForeignKey
ALTER TABLE "rate_mangas" ADD CONSTRAINT "rate_mangas_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "mangas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate_mangas" ADD CONSTRAINT "rate_mangas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "mangas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenderToManga" ADD CONSTRAINT "_GenderToManga_A_fkey" FOREIGN KEY ("A") REFERENCES "genders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenderToManga" ADD CONSTRAINT "_GenderToManga_B_fkey" FOREIGN KEY ("B") REFERENCES "mangas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
