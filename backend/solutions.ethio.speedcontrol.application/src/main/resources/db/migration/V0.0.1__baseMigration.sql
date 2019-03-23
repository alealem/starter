SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE TABLE IF NOT EXISTS `authority` (
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `hibernate_sequence` (
  `next_val` BIGINT(20) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `persistent_audit_event` (
  `event_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `event_date` DATETIME NULL DEFAULT NULL,
  `event_type` VARCHAR(255) NULL DEFAULT NULL,
  `principal` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`event_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `persistent_audit_evt_data` (
  `event_id` BIGINT(20) NOT NULL,
  `value` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`event_id`, `name`),
  CONSTRAINT `FK9ynvwlu7w4uqpjlxvk9kiscqs`
    FOREIGN KEY (`event_id`)
    REFERENCES `persistent_audit_event` (`event_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `user` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `created_by` VARCHAR(50) NOT NULL,
  `created_date` DATETIME NULL DEFAULT NULL,
  `last_modified_by` VARCHAR(50) NULL DEFAULT NULL,
  `last_modified_date` DATETIME NULL DEFAULT NULL,
  `activated` BIT(1) NOT NULL,
  `activation_key` VARCHAR(20) NULL DEFAULT NULL,
  `email` VARCHAR(254) NULL DEFAULT NULL,
  `first_name` VARCHAR(50) NULL DEFAULT NULL,
  `image_url` VARCHAR(256) NULL DEFAULT NULL,
  `lang_key` VARCHAR(6) NULL DEFAULT NULL,
  `last_name` VARCHAR(50) NULL DEFAULT NULL,
  `login` VARCHAR(50) NOT NULL,
  `password_hash` VARCHAR(60) NOT NULL,
  `reset_date` DATETIME NULL DEFAULT NULL,
  `reset_key` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_ew1hvam8uwaknuaellwhqchhb` (`login` ASC),
  UNIQUE INDEX `UK_ob8kqyqqgmefl0aco34akdtpe` (`email` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `user_authority` (
  `user_id` BIGINT(20) NOT NULL,
  `authority_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`user_id`, `authority_name`),
  INDEX `FK6ktglpl5mjosa283rvken2py5` (`authority_name` ASC),
  CONSTRAINT `FK6ktglpl5mjosa283rvken2py5`
    FOREIGN KEY (`authority_name`)
    REFERENCES `authority` (`name`),
  CONSTRAINT `FKpqlsjpkybgos9w2svcri7j8xy`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
