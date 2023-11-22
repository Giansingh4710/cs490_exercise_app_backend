INSERT INTO User VALUES 
    (1, NULL, 'Elliot', 'Livens', 'elivens0@google.com.br', '$2a$04$TVwvixEiF2tqdsMnt7K.hehmwTwd1rSV7HW5LZY7Hoh2WaYEoh8qa', '300-860-5685', '2 Straubel Way', 'Client', 'Male', '2000-05-11', 267, 67, 'Moderate', '2023-11-15 04:34:33'),
    (2, NULL, 'Celka', 'Giblin', 'cgiblin1@taobao.com', '$2a$04$8VxUXP1p0MOhDhik6GUe3uwbFsfQlqFTRMLsqOUwyxrupfFDH668i', '911-719-7901', '17590 Mallory Drive', 'Client', 'Female', '1999-01-13', 159, 64, 'High', '2023-11-15 04:34:33'),
    (3, NULL, 'Barret', 'Nuth', 'bnuth2@yolasite.com', '$2a$04$z83KQmExXLh336wuDdVdm.geVtlNsMfMxjC.SnpB3SYoPm5Ed2P3.', '287-895-6161', '4561 Heffernan Center', 'Client', 'Male', '1991-01-04', 134, 77, 'Moderate', '2023-11-15 04:34:33'),
    (4, NULL, 'Aimee', 'Stilliard', 'astilliard3@dmoz.org', '$2a$04$QmcbGrFXQBJvOCnxC6AV9eFZTn2nfr73.QIYDWO4kvmYUlrnxfIfW', '435-475-8724', '26753 Messerschmidt Trail', 'Coach', 'Female', '1964-01-08', 255, 74, 'Low', '2023-11-15 04:34:33'),
    (5, NULL, 'Dario', 'Glashby', 'dglashby4@yahoo.co.jp', '$2a$04$jAC5RWidZ11hSlqAbBHO8.ZPuw8hDR10bhj3XIkr/zAl5jDIHp9Xe', '913-828-7103', '83 Northridge Park', 'Client', 'Male', '1999-10-16', 218, 73, 'Moderate', '2023-11-15 04:34:33'),
    (6, NULL, 'Belicia', 'Gaynor', 'bgaynor5@lycos.com', '$2a$04$GA0wYica9BtwRZclzOnVMeDZ397gzJJxSKViyyFpB52NK7CPYMbnW', '503-279-5847', '46990 Alpine Lane', 'Client', 'Female', '1962-10-30', 90, 74, 'High', '2023-11-15 04:34:33'),
    (7, NULL, 'Onida', 'Joscelyn', 'ojoscelyn6@fema.gov', '$2a$04$Z85CzStpYklxL7GmGDZSVOTYezuH8GpkgzWcjUMCyJgX.EqYEqpT2', '125-688-7554', '7214 Fairfield Place', 'Client', 'Female', '2003-02-20', 123, 72, 'Moderate', '2023-11-15 04:34:33'),
    (8, NULL, 'Britt', 'Whye', 'bwhye7@arstechnica.com', '$2a$04$ek8/pdpsFQ//nL.f2vE8ouVQsCmep2hfk20oLwd3ovBH7xyEqzVd2', '757-933-7375', '382 Pearson Alley', 'Coach', 'Female', '1990-01-25', 189, 70, 'Low', '2023-11-15 04:34:33'),
    (9, NULL, 'Otto', 'Lownsbrough', 'olownsbrough8@aol.com', '$2a$04$SAbb3LQcFnufN3UZxqAgQOr8sxKybtLY/iReP9xyCI8L25UwMgAVa', '211-210-5039', '03923 Dryden Crossing', 'Client', 'Male', '1990-11-03', 233, 69, 'Moderate', '2023-11-15 04:34:33'),
    (10, NULL, 'Dewie', 'Pembery', 'dpembery9@redcross.org', '$2a$04$f3DGXpfKPSwVnEidIkh4/.ojp/1MlPd08nrHJGEi9t1pClmf0ITHy', '302-318-5130,390', '390 Fairfield Lane', 'Client', 'Male', '1987-01-15', 229, 67, 'High', '2023-11-15 04:34:33');

INSERT INTO Coach VALUES
    (1, 4, 'Weight Lifting', 'Strength building', 35.12, '2023-11-15 04:34:33'),
    (2, 8, 'Cycling', 'Weight loss', 49.66, '2023-11-15 04:34:33');

INSERT INTO Goal VALUES
    (1, 3, 'Strength building', 'vehicula condimentum curabitur in libero ut', 111, '2023-05-10 19:07:08'),
    (2, 4, 'Weight loss', 'penatibus et magnis dis parturient montes', 136, '2023-02-24 10:40:28'),
    (3, 5, 'Muscle building', 'mauris non ligula pellentesque', 148, '2023-09-14 23:13:59'),
    (4, 9, 'Weight gain', 'porttitor lacus at turpis donec posuere', 120, '2023-07-14 07:56:54'),
    (5, 5, 'Stamina building', 'mattis odio donec vitae nisi', 108, '2023-08-16 17:06:41'),
    (6, 6, 'Strength building', 'nulla tellus in sagittis', 108, '2022-11-17 07:05:05'),
    (7, 6, 'Weight loss', 'aliquet pulvinar sed nisl', 113, '2023-05-23 04:51:56'),
    (8, 10, 'Muscle building', 'nisl ut volutpat sapien arcu sed augue aliquam', 176, '2023-02-03 13:57:05'),
    (9, 7, 'Weight gain', 'nisl aenean lectus pellentesque eget', 175, '2023-07-14 12:37:25'),
    (10, 7, 'Stamina building', 'nulla ac enim in tempor turpis nec euismod', 125, '2023-10-07 12:50:37');

INSERT INTO WaterIntake VALUES
    (1, 5, '2023-08-28', 6.0, 'Quart', '2023-05-18 16:22:32'),
    (2, 8, '2023-11-09', 2.8, 'Pint', '2023-02-03 02:53:00'),
    (3, 9, '2023-11-01', 4.5, 'Cup', '2023-06-08 05:26:04'),
    (4, 9, '2023-07-16', 12.2, 'Fl. Oz', '2023-07-24 02:53:27'),
    (5, 9, '2023-10-06', 3.4, 'Gallon', '2023-07-17 02:30:02'),
    (6, 8, '2023-07-19', 6.0, 'Quart', '2022-11-17 13:42:30'),
    (7, 4, '2023-04-18', 14.2, 'Pint', '2023-07-25 23:00:53'),
    (8, 2, '2023-04-12', 19.5, 'Cup', '2023-02-14 03:47:11'),
    (9, 6, '2023-03-18', 17.9, 'Fl. Oz', '2023-03-07 11:29:49'),
    (10, 8, '2023-01-05', 14.6, 'Gallon', '2023-04-10 19:36:55');

INSERT INTO FoodIntake VALUES
    (1, 8, '2022-11-26', 'Pizza', 'Lunch', 1480, 44, 89, 8, '2023-01-10 12:40:01'),
    (2, 7, '2023-07-14', 'Steak', 'Snack', 761, 20, 88, 1, '2023-09-20 08:11:37'),
    (3, 2, '2023-07-08', 'Fish', 'Dinner', 975, 48, 95, 14, '2023-06-02 08:52:17'),
    (4, 9, '2023-09-14', 'Yogurt', 'Brunch', 1510, 19, 30, 8, '2023-03-12 07:07:11'),
    (5, 4, '2023-10-23', 'Salad', 'Breakfast', 782, 22, 62, 14, '2022-12-24 18:55:10'),
    (6, 7, '2023-04-01', 'Pizza', 'Lunch', 1995, 21, 39, 6, '2023-05-04 15:52:20'),
    (7, 4, '2023-09-05', 'Steak', 'Snack', 1163, 18, 11, 15, '2023-01-24 01:54:00'),
    (8, 9, '2023-03-25', 'Fish', 'Dinner', 465, 43, 35, 14, '2023-10-09 09:21:46'),
    (9, 7, '2023-08-31', 'Yogurt', 'Brunch', 951, 14, 87, 11, '2023-05-30 10:26:36'),
    (10, 1, '2023-04-18', 'Salad', 'Breakfast', 1486, 38, 54, 6, '2023-10-14 12:01:26');

INSERT INTO MentalState VALUES
    (1, 7, '2023-04-20', 'Very unhappy', '2023-11-06 12:21:20'),
    (2, 5, '2023-02-09', 'Unhappy', '2023-02-14 17:02:26'),
    (3, 10, '2022-11-24', 'Very Happy', '2023-05-12 11:39:10'),
    (4, 7, '2023-05-02', 'Content', '2023-01-12 04:19:13'),
    (5, 4, '2023-01-08', 'Content', '2023-04-29 02:52:51'),
    (6, 7, '2022-12-25', 'Happy', '2022-12-09 14:45:54'),
    (7, 8, '2023-02-19', 'Very unhappy', '2023-05-11 07:05:35'),
    (8, 1, '2023-03-28', 'Unhappy', '2023-06-11 23:08:23'),
    (9, 10, '2022-11-29', 'Very Happy', '2023-09-18 14:50:59'),
    (10, 8, '2023-09-19', 'Content', '2023-11-11 08:11:25');

INSERT INTO Exercise VALUES
    (1, 'Deadlift', 'Back & legs', 'Advanced', 'Compound', '2023-01-07 03:20:33'),
    (2, 'Bench press', 'Chest', 'Intermediate', 'Compound', '2023-04-16 16:16:34'),
    (3, 'Bicep curls', 'Arms', 'Beginner', 'Isolation', '2022-12-15 12:31:40'),
    (4, 'Tricep dips', 'Triceps', 'Intermediate', 'Isolation', '2023-10-19 19:06:20'),
    (5, 'Squats', 'Legs', 'Intermediate', 'Compound', '2023-09-06 18:02:03'),
    (6, 'Deadlift', 'Back & legs', 'Advanced', 'Compound', '2023-04-09 04:55:52');

INSERT INTO WorkoutPlan VALUES
    (1, 8, 1, 'Tuesday', '2022-12-09 09:09:13'),
    (2, 8, 3, 'Thursday', '2022-12-23 05:31:27'),
    (3, 2, 4, 'Friday', '2023-08-28 15:45:52'),
    (4, 2, 5, 'Sunday', '2023-09-19 20:44:43'),
    (5, 1, 3, 'Thursday', '2023-03-31 04:29:43'),
    (6, 5, 5, 'Sunday', '2023-09-14 01:38:46'),
    (7, 3, 3, 'Thursday', '2023-08-23 15:07:04'),
    (8, 1, 1, 'Tuesday', '2023-06-11 14:19:18'),
    (9, 7, 5, 'Sunday', '2023-01-02 01:13:53'),
    (10, 8, 1, 'Tuesday', '2022-12-28 19:44:47');

INSERT INTO Record VALUES
    (1, 10, 2, '2023-02-07', 9, 3, 140, 45, '2023-07-18 05:11:27'),
    (2, 3, 4, '2023-02-09', 11, 6, 301, 20, '2023-10-01 19:50:01'),
    (3, 8, 2, '2023-09-23', 16, 5, 119, 54, '2023-09-14 05:20:21'),
    (4, 7, 1, '2023-04-23', 8, 3, 315, 30, '2023-09-02 09:41:22'),
    (5, 2, 4, '2023-11-03', 19, 5, 194, 14, '2023-06-23 03:34:35'),
    (6, 5, 6, '2023-10-28', 9, 5, 195, 12, '2022-12-21 10:53:21'),
    (7, 6, 4, '2023-11-04', 5, 5, 390, 52, '2023-02-21 12:01:53'),
    (8, 5, 4, '2023-05-26', 13, 2, 207, 59, '2023-02-06 20:38:54'),
    (9, 5, 2, '2023-03-09', 13, 1, 189, 33, '2023-03-24 05:50:11'),
    (10, 10, 5, '2023-10-17', 15, 8, 26, 32, '2023-02-20 01:34:50');

INSERT INTO Request VALUES
    (1, 2, 1, 'Denied', 'Strength building', 'elementum nullam varius nulla', '2023-02-24 01:54:31'),
    (2, 4, 2, 'Pending', 'Weight loss', 'bibendum morbi non quam nec', '2023-01-08 17:38:05'),
    (3, 8, 2, 'Denied', 'Weight loss', 'potenti nullam porttitor lacus at turpis donec posuere', '2022-12-06 09:37:35'),
    (4, 5, 2, 'Accepted', 'Weight loss', 'augue vestibulum ante ipsum primis in', '2023-05-07 06:32:13'),
    (5, 2, 1, 'Accepted', 'Strength building', 'in purus eu magna vulputate luctus cum sociis', '2023-06-14 01:24:05'),
    (6, 5, 2, 'Denied', 'Weight loss', 'eget tincidunt eget tempus vel pede', '2023-06-01 01:50:57'),
    (7, 7, 2, 'Pending', 'Weight loss', 'blandit lacinia erat vestibulum sed magna at nunc', '2023-11-04 13:59:41'),
    (8, 3, 2, 'Denied', 'Weight loss', 'morbi vestibulum velit id pretium iaculis diam erat', '2023-02-22 04:09:39'),
    (9, 9, 1, 'Accepted', 'Strength building', 'potenti cras in purus eu magna', '2023-08-30 18:51:29'),
    (10, 7, 1, 'Accepted', 'Strength building', 'blandit lacinia erat vestibulum sed', '2023-09-14 07:35:34');


INSERT INTO Appointment VALUES
    (1, 2, 2, '2023-01-18', '16:28', '2023-03-26 22:12:37'),
    (2, 6, 1, '2023-05-14', '4:16', '2023-01-18 17:00:40'),
    (3, 10, 1, '2023-06-25', '23:36', '2023-10-23 21:02:10'),
    (4, 8, 2, '2022-12-20', '18:19', '2023-04-03 16:48:39'),
    (5, 1, 1, '2023-03-09', '20:12', '2023-03-31 21:10:02'),
    (6, 2, 2, '2022-12-13', '5:39', '2023-10-22 07:46:32'),
    (7, 9, 1, '2023-07-14', '1:27', '2023-08-12 05:09:16'),
    (8, 6, 1, '2023-08-05', '23:28', '2023-01-15 17:20:55'),
    (9, 8, 2, '2023-10-16', '15:10', '2023-10-07 08:23:03'),
    (10, 2, 2, '2023-06-26', '2:51', '2022-11-26 03:00:28');


INSERT INTO Message VALUES
    (1, 8, 4, 'duis at velit eu', '2023-10-22 16:53:30'),
    (2, 2, 5, 'libero rutrum ac lobortis vel dapibus at diam', '2023-04-21 15:42:09'),
    (3, 9, 7, 'elementum eu interdum eu tincidunt in leo maecenas', '2023-08-07 03:40:31'),
    (4, 2, 5, 'eget rutrum at lorem integer', '2023-09-14 05:09:31'),
    (5, 9, 8, 'facilisi cras non velit nec nisi', '2023-05-05 05:42:18'),
    (6, 10, 9, 'volutpat erat quisque erat eros', '2023-03-15 07:54:54'),
    (7, 1, 2, 'tortor duis mattis egestas metus', '2022-12-17 21:45:34'),
    (8, 8, 2, 'blandit nam nulla integer pede justo lacinia', '2023-02-14 12:35:34'),
    (9, 6, 7, 'hendrerit at vulputate vitae', '2023-03-26 13:42:50'),
    (10, 5, 9, 'semper porta volutpat quam pede lobortis', '2023-06-21 00:30:52');

UPDATE User SET CoachID = 2 WHERE UserID = 5;
UPDATE User SET CoachID = 1 WHERE UserID = 2;
UPDATE User SET CoachID = 1 WHERE UserID = 9;
UPDATE User SET CoachID = 1 WHERE UserID = 7;

