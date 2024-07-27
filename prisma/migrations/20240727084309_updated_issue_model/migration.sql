/*
  Warnings:

  - You are about to alter the column `status` on the `Issue` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `label` ENUM('BUG', 'FEATURE', 'DOCUMENTATION') NOT NULL DEFAULT 'BUG',
    ADD COLUMN `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL DEFAULT 'LOW',
    MODIFY `status` ENUM('TODO', 'IN_PROGRESS', 'CANCELLED', 'DONE') NOT NULL DEFAULT 'TODO';
