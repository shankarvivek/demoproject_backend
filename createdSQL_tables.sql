CREATE TABLE `affiliate_demo`.`orders` (
  `orderID` VARCHAR(50) NOT NULL DEFAULT (uuid()),
  `external_order_id` VARCHAR(50) NULL DEFAULT NULL,
  `affiliate_id` VARCHAR(50) NULL DEFAULT NULL,
  `amount` VARCHAR(40) NULL DEFAULT 0,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`orderID`),
  UNIQUE INDEX `orderID_UNIQUE` (`orderID` ASC) VISIBLE
);


CREATE TABLE `affiliate_demo`.`commissions` (
  `commissionsID` VARCHAR(45) NOT NULL DEFAULT (uuid()),
  `order_id` VARCHAR(45) NULL DEFAULT NULL,
  `internal_partner_id` VARCHAR(45) NULL DEFAULT NULL,
  `commission_rate` FLOAT NULL DEFAULT 0,
  `commission_amount` FLOAT NULL DEFAULT 0,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` TIMESTAMP(3) NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`commissionsID`),
  UNIQUE INDEX `commissionsID_UNIQUE` (`commissionsID` ASC) VISIBLE
);


CREATE TABLE `affiliate_demo`.`demo_tiktok_internal_partner_id` (
  `id` VARCHAR(45) NOT NULL DEFAULT (uuid()),
  `tiktok_affirmation` VARCHAR(45) NULL DEFAULT NULL,
  `internal_id` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);


INSERT INTO `affiliate_demo`.`demo_tiktok_internal_partner_id` (`tiktok_affirmation`, `internal_id`) VALUES ('tiktok_aff_1', 'internal_1001');
INSERT INTO `affiliate_demo`.`demo_tiktok_internal_partner_id` (`tiktok_affirmation`, `internal_id`) VALUES ('tiktok_aff_2', 'internal_1002');
INSERT INTO `affiliate_demo`.`demo_tiktok_internal_partner_id` (`tiktok_affirmation`, `internal_id`) VALUES ('tiktok_aff_3', 'internal_1003');