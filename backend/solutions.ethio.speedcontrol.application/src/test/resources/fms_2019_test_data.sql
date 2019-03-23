
-- Insert bankPage
INSERT INTO `bank_page` (`id`, `blz`, `creation_date`, `file_name`, `url`)
VALUES (1, '10090000',curdate(), '96ceb833-ddea-4819-bfc9-c4a6e07ab23f', 'https://www.berliner-volksbank.de/banking/online-banking/online-services.html');
INSERT INTO `bank_page` (`id`, `blz`, `creation_date`, `file_name`, `url`)
VALUES (2, '10090000',curdate(),'4eeaf038-1d15-46ad-885c-9cebc54b891a', 'https://www.berliner-volksbank.de/wir-fuer-sie/blog.html');
INSERT INTO `bank_page` (`id`, `blz`, `creation_date`, `file_name`, `url`)
VALUES (3, '10090000',curdate(),'e9361eda-e3c0-484c-83b6-f0a335a7255b', 'https://www.berliner-volksbank.de/wir-fuer-sie/news/neuerungen-banking-180515.html');
INSERT INTO `bank_page` (`id`, `blz`, `creation_date`, `file_name`, `url`)
VALUES (4, '10090000',curdate(),'7e8c7948-7d28-48ed-8c3e-3d17ccef4321','https://www.berliner-volksbank.de/privatkunden/girokonten-und-karten/bankkarten/kartenservices/verlust-der-bankcard.html' );
INSERT INTO `bank_page` (`id`, `blz`, `creation_date`, `file_name`, `url`)
VALUES (5, '10090000',curdate(),'1b61d3d5-53fa-46ef-825d-e5f61b48896e', 'https://www.berliner-volksbank.de/firmenkunden/liquiditaet-und-zahlungsverkehr/ipad-kassensystem.html');
INSERT INTO `bank_page` (`id`, `blz`, `creation_date`, `file_name`, `url`)
VALUES (6, '10090000',curdate(),'79c5555b-7bdd-4b05-85be-6d7774486f3b','https://www.berliner-volksbank.de/service/formulare/terminvereinbarung/standard.html' );
INSERT INTO `bank_page` (`id`, `blz`, `creation_date`, `file_name`, `url`)
VALUES (7, '10090000',curdate(),'c7eea4ba-3ff0-4f91-964b-89ed82ebe35b', 'https://www.berliner-volksbank.de/service/impressum.html');
INSERT INTO `bank_page` (`id`, `blz`, `creation_date`, `file_name`, `url`)
VALUES (8, '10090000',curdate(),'5bb3a88c-7ad9-4a2a-9663-1d956505d7de',  'https://www.berliner-volksbank.de/wir-fuer-sie/unsere-bank/vrsisy.html');
INSERT INTO `bank_page` (`id`, `blz`, `creation_date`, `file_name`, `url`)
VALUES (9, '10090000',curdate(),'a3e0c4b3-83a9-4c14-89db-192ed1b1e1e3','https://www.berliner-volksbank.de/banking-business/entry' );
INSERT INTO `bank_page` (`id`, `blz`, `creation_date`, `file_name`, `url`)
VALUES (10, '10090000',curdate(),'a05c7488-4606-48f9-b08b-ab1a8f392d30','https://www.berliner-volksbank.de/service/formulare/email/standard.html?contactRes=/website/homepage/jcr:content/kampagnenbereich/kampagnegrosszwei/kontaktwidget/parsys/kontakt/kontakt');

-- Insert screenshots
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('42832', '',curdate(), 'bankPages/52069519/105d1bcf-70a2-4376-bc9c-c4717f9e3835.png', 'FMS_USER', '1');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('42833', '',curdate(), 'bankPages/21092023/c6da264b-7dc5-4b03-acdf-292d43be7271.png', 'FMS_USER','2');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('42851', 'reiter_-1102466786',curdate(), 'bankPages/28069956/06fa12dd-6afc-4a74-94f3-c38b0ea518bb.png', 'FMS_USER','3');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('42879', 'reiter_-678945332',curdate(), 'bankPages/28069956/06fa12dd-6afc-4a74-94f3-c38b0ea518bb.png','FMS_USER', '4');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('42889', 'reiter_-651521065',curdate(), 'bankPages/44160014/e56a9e3e-4ddc-4567-853a-0d7611851457.png','FMS_USER', '5');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('42932', '',curdate(), 'bankPages/52069519/5ace86d6-682c-4c33-aa85-2e68c01893c8.png','FMS_USER', '6');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('42940', 'reiter_-807573367',curdate(), 'bankPages/20190003/2e7ef77b-5c82-4436-a1b7-2f049b504626.png','FMS_USER', '7');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('42953', '',curdate(), 'bankPages/52069519/aeb59fff-e422-4e21-a178-afc26c32f5c1.png','FMS_USER', '8');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('42978', 'reiter_2005040570',curdate(), 'bankPages/44160014/369cea9f-b2c4-4c2a-aaf3-9b34816c85c5.png','FMS_USER', '9');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES (
'43015', '',curdate(), 'bankPages/21092023/5fb8faf7-5e75-4a8b-b786-5e0666193bbd.png','FMS_USER', '10');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('43019', 'reiter_-11790825',curdate(), 'bankPages/44160014/3ce2ddf0-d8ae-43e1-a7a1-1ed3e0016125.png','FMS_USER', '1');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('43043', 'reiter_1947970840',curdate(), 'bankPages/44160014/369cea9f-b2c4-4c2a-aaf3-9b34816c85c5.png', 'FMS_USER','2');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('43057', 'reiter_2005040570',curdate(), 'bankPages/44160014/215f53a5-4cd4-40ca-a279-f248a1070238.png','FMS_USER', '3');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('43092', 'reiter_623355658',curdate(), 'bankPages/31060181/2ab7b5f6-d35c-49d2-bdaa-54cdb1905924.png','FMS_USER', '4');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('43098', '',curdate(), 'bankPages/72191600/59b8c2b6-9932-4596-9775-e487cece12c9.png','FMS_USER', '5');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('43105', '',curdate(), 'bankPages/55060611/2e0437cf-4f15-402e-9459-7ca752c73537.png','FMS_USER', '6');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('43145', '',curdate(), 'bankPages/72191600/a198f912-b150-4dc9-8d8d-ecf47825906a.png','FMS_USER', '7');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('43163', 'reiter_-1602169040',curdate(), 'bankPages/20190003/7058cf72-e75c-4f1d-be57-3c6320f1bffc.png','FMS_USER', '8');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('43198', '',curdate(), 'bankPages/21092023/3e6f4826-d219-468c-96c3-9b16e6f2f54b.png','FMS_USER', '9');
INSERT INTO `screenshot` (`id`,`anchor`,`created_at`,`screenshot_path`,`source`,`bank_page_id`)
VALUES ('43232', '',curdate(), 'bankPages/72191600/28094810-26f5-482e-8fe1-92b08d87884f.png','FMS_USER', '10');

-- Insert bank_specification_page_link
INSERT INTO `bank_specification_page_link` (`id`, `created_by`, `url`, `bank_id`, `specification_page_id`) VALUES ('1', 'FMS_USER', 'https://www.berliner-volksbank.de/banking/online-banking/online-services.html', '1', '8');

-- Insert authorities
INSERT INTO `authority` (`name`) VALUES ('ROLE_ADMIN');
INSERT INTO `authority` (`name`) VALUES ('ROLE_USER');

-- Insert users
INSERT INTO `user` (`id`, `created_by`, `created_date`, `last_modified_by`, `last_modified_date`, `activated`, `activation_key`, `email`, `first_name`, `image_url`, `lang_key`, `last_name`, `login`, `password_hash`)
 VALUES ('1', 'admin', '2019-03-05 08:13:11', 'admin', '2019-03-05 08:13:11', TRUE, '', 'admin@admin.com', '', '', 'de', '', 'admin', '$2a$10$trxpbDCleeSI9IeV0XCpI.4GnfA.w4IW7J7NNwa3LeWmPHY/.0QTe');
INSERT INTO `user` (`id`, `created_by`, `created_date`, `last_modified_by`, `last_modified_date`, `activated`, `activation_key`, `email`, `first_name`, `image_url`, `lang_key`, `last_name`, `login`, `password_hash`)
 VALUES ('2', 'user', '2019-03-05 08:13:11', 'user', '2019-03-05 08:13:11', TRUE, '', 'user@admin.com', '', '', 'de', '', 'user', '$2a$10$trxpbDCleeSI9IeV0XCpI.4GnfA.w4IW7J7NNwa3LeWmPHY/.0QTe');

-- Insert user_authority
INSERT INTO `user_authority` (`user_id`, `authority_name`) VALUES ('1', 'ROLE_ADMIN');
INSERT INTO `user_authority` (`user_id`, `authority_name`) VALUES ('1', 'ROLE_USER');




