/*
  Warnings:

  - You are about to drop the column `createAt` on the `pay` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `pay` table. All the data in the column will be lost.
  - You are about to alter the column `pay` on the `pay` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `createAt` on the `receive` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `receive` table. All the data in the column will be lost.
  - You are about to alter the column `receive` on the `receive` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Made the column `pay` on table `pay` required. This step will fail if there are existing NULL values in that column.
  - Made the column `value` on table `pay` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receive` on table `receive` required. This step will fail if there are existing NULL values in that column.
  - Made the column `value` on table `receive` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pay" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_pay" ("date", "id", "pay", "value") SELECT "date", "id", "pay", "value" FROM "pay";
DROP TABLE "pay";
ALTER TABLE "new_pay" RENAME TO "pay";
CREATE TABLE "new_receive" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "receive" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_receive" ("date", "id", "receive", "value") SELECT "date", "id", "receive", "value" FROM "receive";
DROP TABLE "receive";
ALTER TABLE "new_receive" RENAME TO "receive";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
