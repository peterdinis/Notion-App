-- CreateTable
CREATE TABLE "Workspace" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "data" TEXT NOT NULL DEFAULT '',
    "inTrash" TEXT NOT NULL DEFAULT '',
    "logo" TEXT,
    "bannerUrl" TEXT NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);
