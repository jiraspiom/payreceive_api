/*
  Warnings:

  - Made the column `status` on table `pay` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `receive` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pay" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_pay" ("createdAt", "date", "id", "pay", "status", "updatedAt", "value") SELECT "createdAt", "date", "id", "pay", "status", "updatedAt", "value" FROM "pay";
DROP TABLE "pay";
ALTER TABLE "new_pay" RENAME TO "pay";
CREATE TABLE "new_receive" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "receive" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_receive" ("createdAt", "date", "id", "receive", "status", "updatedAt", "value") SELECT "createdAt", "date", "id", "receive", "status", "updatedAt", "value" FROM "receive";
DROP TABLE "receive";
ALTER TABLE "new_receive" RENAME TO "receive";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
