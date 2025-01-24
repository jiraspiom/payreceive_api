/*
  Warnings:

  - You are about to drop the column `text` on the `pay` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `receive` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pay" TEXT,
    "value" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME
);
INSERT INTO "new_pay" ("createAt", "date", "id", "updateAt", "value") SELECT "createAt", "date", "id", "updateAt", "value" FROM "pay";
DROP TABLE "pay";
ALTER TABLE "new_pay" RENAME TO "pay";
CREATE TABLE "new_receive" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "receive" TEXT,
    "value" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME
);
INSERT INTO "new_receive" ("createAt", "date", "id", "updateAt", "value") SELECT "createAt", "date", "id", "updateAt", "value" FROM "receive";
DROP TABLE "receive";
ALTER TABLE "new_receive" RENAME TO "receive";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
