-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_issueId_fkey`;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_issueId_fkey` FOREIGN KEY (`issueId`) REFERENCES `Issue`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
