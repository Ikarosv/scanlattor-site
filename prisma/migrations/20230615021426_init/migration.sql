-- CreateTable
CREATE TABLE "mangas" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mangas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "genders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate_mangas" (
    "id" SERIAL NOT NULL,
    "mangaId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,

    CONSTRAINT "rate_mangas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapters" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "number" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mangaId" INTEGER NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GenderToManga" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_GenderToManga_AB_unique" ON "_GenderToManga"("A", "B");

-- CreateIndex
CREATE INDEX "_GenderToManga_B_index" ON "_GenderToManga"("B");

-- AddForeignKey
ALTER TABLE "rate_mangas" ADD CONSTRAINT "rate_mangas_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "mangas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate_mangas" ADD CONSTRAINT "rate_mangas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "mangas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenderToManga" ADD CONSTRAINT "_GenderToManga_A_fkey" FOREIGN KEY ("A") REFERENCES "genders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenderToManga" ADD CONSTRAINT "_GenderToManga_B_fkey" FOREIGN KEY ("B") REFERENCES "mangas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
