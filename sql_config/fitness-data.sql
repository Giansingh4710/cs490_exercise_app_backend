-- Dumping data for User table

INSERT INTO User VALUES 
    (1, NULL, 'Admin', 'Admin', 'admin@fitfusion.com', '$2b$13$WHpbpae0tLIH4HuozP4FHeYew2JxT6jv.iCQNbWdnQkheDMqnH8qu', '000-000-0000', NULL, NULL, NULL, '12345', 'Admin', NULL, '2000-01-01', 0, 0, NULL, './profile-photos/male_01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, NULL, 'Elliot', 'Livens', 'elivens0@google.com.br', '$2a$04$TVwvixEiF2tqdsMnt7K.hehmwTwd1rSV7HW5LZY7Hoh2WaYEoh8qa', '300-860-5685', '2 Straubel Way', 'Chattanooga', 'Tennessee', '12345', 'Client', 'Male', '2000-05-11', 267, 67, 'Moderate', './profile-photos/male_01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, NULL, 'Celka', 'Giblin', 'cgiblin1@taobao.com', '$2a$04$8VxUXP1p0MOhDhik6GUe3uwbFsfQlqFTRMLsqOUwyxrupfFDH668i', '911-719-7901', '17590 Mallory Drive', 'Conroe', 'Texas', '12345', 'Client', 'Female', '1999-01-13', 159, 64, 'High', './profile-photos/female_03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, NULL, 'Barret', 'Nuth', 'bnuth2@yolasite.com', '$2a$04$z83KQmExXLh336wuDdVdm.geVtlNsMfMxjC.SnpB3SYoPm5Ed2P3.', '287-895-6161', '4561 Heffernan Center', 'Las Cruces', 'New Mexico', '12345', 'Client', 'Male', '1991-01-04', 134, 77, 'Moderate', './profile-photos/male_02', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, NULL, 'Aimee', 'Stilliard', 'astilliard3@dmoz.org', '$2a$04$QmcbGrFXQBJvOCnxC6AV9eFZTn2nfr73.QIYDWO4kvmYUlrnxfIfW', '435-475-8724', '26753 Messerschmidt Trail', 'Carson City', 'Nevada', '12345', 'Coach', 'Female', '1964-01-08', 255, 74, 'Low', './profile-photos/female_02', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, NULL, 'Dario', 'Glashby', 'dglashby4@yahoo.co.jp', '$2a$04$jAC5RWidZ11hSlqAbBHO8.ZPuw8hDR10bhj3XIkr/zAl5jDIHp9Xe', '913-828-7103', '83 Northridge Park', 'Raleigh', 'North Carolina', '12345', 'Client', 'Male', '1999-10-16', 218, 73, 'Moderate', './profile-photos/male_03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, NULL, 'Belicia', 'Gaynor', 'bgaynor5@lycos.com', '$2a$04$GA0wYica9BtwRZclzOnVMeDZ397gzJJxSKViyyFpB52NK7CPYMbnW', '503-279-5847', '46990 Alpine Lane', 'Norfolk', 'Virginia', '12345', 'Client', 'Female', '1962-10-30', 90, 74, 'High', './profile-photos/female_02', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, NULL, 'Onida', 'Joscelyn', 'ojoscelyn6@fema.gov', '$2a$04$Z85CzStpYklxL7GmGDZSVOTYezuH8GpkgzWcjUMCyJgX.EqYEqpT2', '125-688-7554', '7214 Fairfield Place', 'Louisville', 'Kentucky', '12345', 'Client', 'Female', '2003-02-20', 123, 72, 'Moderate', './profile-photos/female_03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, NULL, 'Britt', 'Whye', 'bwhye7@arstechnica.com', '$2a$04$ek8/pdpsFQ//nL.f2vE8ouVQsCmep2hfk20oLwd3ovBH7xyEqzVd2', '757-933-7375', '382 Pearson Alley', 'Omaha', 'Nebraska', '12345', 'Coach', 'Female', '1990-01-25', 189, 70, 'Low', './profile-photos/female_01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, NULL, 'Otto', 'Lownsbrough', 'olownsbrough8@aol.com', '$2a$04$SAbb3LQcFnufN3UZxqAgQOr8sxKybtLY/iReP9xyCI8L25UwMgAVa', '211-210-5039', '03923 Dryden Crossing', 'Melbourne', 'Florida', '12345', 'Client', 'Male', '1990-11-03', 233, 69, 'Moderate', './profile-photos/male_01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (11, NULL, 'Dewie', 'Pembery', 'dpembery9@redcross.org', '$2a$04$f3DGXpfKPSwVnEidIkh4/.ojp/1MlPd08nrHJGEi9t1pClmf0ITHy', '302-318-5130', '390 Fairfield Lane', 'Ridgely', 'Maryland', '12345', 'Client', 'Male', '1987-01-15', 229, 67, 'High', './profile-photos/male_03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Dumping data for Coach table
INSERT INTO Coach VALUES
    (1, 4, 'Strength building', 35.12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 8, 'Weight loss', 49.66, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Dumping data for Goal table
INSERT INTO Goal VALUES
    (1, 3, 'Strength building', 'vehicula condimentum curabitur in libero ut', 111, 10, 2000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 4, 'Weight loss', 'penatibus et magnis dis parturient montes', 136, 11.5, 2025, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 5, 'Muscle building', 'mauris non ligula pellentesque', 148, 15.5, 2210, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 9, 'Weight gain', 'porttitor lacus at turpis donec posuere', 120, 13, 2500, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 5, 'Stamina building', 'mattis odio donec vitae nisi', 108, 12.5, 2450, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 6, 'Strength building', 'nulla tellus in sagittis', 108, 16, 2040, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 6, 'Weight loss', 'aliquet pulvinar sed nisl', 113, 10, 2100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 10, 'Muscle building', 'nisl ut volutpat sapien arcu sed augue aliquam', 176, 13.5, 2325, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 7, 'Weight gain', 'nisl aenean lectus pellentesque eget', 175, 14, 2550, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 7, 'Stamina building', 'nulla ac enim in tempor turpis nec euismod', 125, 10.5, 2000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Dumping data for WeightProgress table
INSERT INTO WeightProgress VALUES
    (1, 4, 150, '2023-08-28', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 4, 149, '2023-11-09', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 6, 110, '2023-11-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 8, 164, '2023-10-06', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 4, 240, '2023-07-19', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 7, 85, '2023-01-05', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 7, 190, '2023-08-28', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 10, 278, '2023-07-19', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 2, 212, '2023-07-19', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 3, 187, '2023-03-18', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Dumping data for WaterIntake table
INSERT INTO WaterIntake VALUES
    (1, 5, '2023-08-28', 6.0, 'Quart', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 8, '2023-11-09', 2.8, 'Pint', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 9, '2023-11-01', 4.5, 'Cup', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 9, '2023-07-16', 12.2, 'Fl. Oz', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 9, '2023-10-06', 3.4, 'Gallon', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 8, '2023-07-19', 6.0, 'Quart', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 4, '2023-04-18', 14.2, 'Pint', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 2, '2023-04-12', 19.5, 'Cup', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 6, '2023-03-18', 17.9, 'Fl. Oz', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 8, '2023-01-05', 14.6, 'Gallon', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Dumping data for FoodIntake table
INSERT INTO FoodIntake VALUES
    (1, 8, '2022-11-26', 'Pizza', 'Lunch', 1480, 44, 89, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 7, '2023-07-14', 'Steak', 'Snack', 761, 20, 88, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 2, '2023-07-08', 'Fish', 'Dinner', 975, 48, 95, 14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 9, '2023-09-14', 'Yogurt', 'Brunch', 1510, 19, 30, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 4, '2023-10-23', 'Salad', 'Breakfast', 782, 22, 62, 14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 7, '2023-04-01', 'Pizza', 'Lunch', 1995, 21, 39, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 4, '2023-09-05', 'Steak', 'Snack', 1163, 18, 11, 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 9, '2023-03-25', 'Fish', 'Dinner', 465, 43, 35, 14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 7, '2023-08-31', 'Yogurt', 'Brunch', 951, 14, 87, 11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 1, '2023-04-18', 'Salad', 'Breakfast', 1486, 38, 54, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Dumping data for MentalState table
INSERT INTO MentalState VALUES
    (1, 7, '2023-04-20', 'Very unhappy', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 5, '2023-02-09', 'Unhappy', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 10, '2022-11-24', 'Very Happy', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 7, '2023-05-02', 'Content', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 4, '2023-01-08', 'Content', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 7, '2022-12-25', 'Happy', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 8, '2023-02-19', 'Very unhappy', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 1, '2023-03-28', 'Unhappy', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 10, '2022-11-29', 'Very Happy', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 8, '2023-09-19', 'Content', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Dumping data for Exercise table
INSERT INTO Exercise VALUES
    (1, 'Deadlift', 'Back & legs', 'Advanced', 'Barbell', 'Compound', 'Reps', 'Enabled', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'Bench press', 'Chest', 'Intermediate', 'Bench Press', 'Compound', 'Reps', 'Enabled', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'Bicep curls', 'Arms', 'Beginner', 'Dmubells', 'Isolation', 'Reps', 'Enabled', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'Tricep dips', 'Triceps', 'Intermediate', 'Bodyweight', 'Reps', 'Isolation', 'Enabled', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 'Squats', 'Legs', 'Intermediate', 'Bodyweight', 'Compound', 'Reps', 'Enabled', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 'Deadlift', 'Back & legs', 'Advanced', 'Barbell', 'Compound', 'Reps', 'Enabled', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Dumping data for WorkoutPlan table
INSERT INTO WorkoutPlan VALUES
    (1, 8, 1, 'Tuesday', 9, 3, 140, 45, 'Client', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 8, 3, 'Thursday', 11, 6, 301, 20, 'Client', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 2, 4, 'Friday', 16, 6, 119, 54, 'Client', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 2, 5, 'Sunday', 8, 3, 140, 30, 'Coach', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 1, 3, 'Thursday', 8, 3, 194, 14, 'Coach', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 5, 5, 'Sunday', 19, 5, 194, 14, 'Client', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 3, 3, 'Thursday', 9, 5, 195, 12, 'Client', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 1, 1, 'Tuesday', 13, 2, 207, 59, 'Coach', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 7, 5, 'Sunday', 13, 1, 189, 33, 'Client', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 8, 1, 'Tuesday', 15, 8, 26, 32, 'Client', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Dumping data for Record table
INSERT INTO Record VALUES
    (1, 10, 2, '2023-02-07', 9, 3, 140, 45, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 3, 4, '2023-02-09', 11, 6, 301, 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 8, 2, '2023-09-23', 16, 5, 119, 54, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 7, 1, '2023-04-23', 8, 3, 315, 30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 2, 4, '2023-11-03', 19, 5, 194, 14, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 5, 6, '2023-10-28', 9, 5, 195, 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 6, 4, '2023-11-04', 5, 5, 390, 52, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 5, 4, '2023-05-26', 13, 2, 207, 59, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 5, 2, '2023-03-09', 13, 1, 189, 33, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 10, 5, '2023-10-17', 15, 8, 26, 32, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Dumping data for Request table
INSERT INTO Request VALUES
    (1, 2, 1, 'Denied', 'Strength building', 'elementum nullam various nulla', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 4, 2, 'Pending', 'Weight loss', 'bibendum morbi non quam nec', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 8, 2, 'Denied', 'Weight loss', 'potenti nullam porttitor lacus at turpis donec posuere', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 5, 2, 'Accepted', 'Weight loss', 'augue vestibulum ante ipsum primis in', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 2, 1, 'Accepted', 'Strength building', 'in purus eu magna vulputate luctus cum sociis', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 5, 2, 'Denied', 'Weight loss', 'eget tincidunt eget tempus vel pede', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 7, 2, 'Pending', 'Weight loss', 'blandit lacinia erat vestibulum sed magna at nunc', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 3, 2, 'Denied', 'Weight loss', 'morbi vestibulum velit id pretium iaculis diam erat', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 9, 1, 'Accepted', 'Strength building', 'potenti cras in purus eu magna', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 7, 1, 'Accepted', 'Strength building', 'blandit lacinia erat vestibulum sed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO CoachRequest VALUES
    (1, 5, 'Denied', 'Strength building', 99.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 4, 'Denied', 'Weight loss', 36.70, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 6, 'Pending', 'Weight loss', 90.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 8, 'Denied', 'Weight loss', 50.25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 5, 'Denied', 'Strength building', 88.74, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 2, 'Pending', 'Weight loss', 66.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 4, 'Accepted', 'Weight loss', 35.12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 7, 'Pending', 'Weight loss', 52.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 8, 'Accepted', 'Strength building', 49.66, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 6, 'Denied', 'Strength building', 20.87, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Dumping data for Appointment table
INSERT INTO Appointment VALUES
    (1, 2, 2, '2023-01-18', '16:28', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 6, 1, '2023-05-14', '4:16', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 10, 1, '2023-06-25', '23:36', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 8, 2, '2022-12-20', '18:19', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 1, 1, '2023-03-09', '20:12', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 2, 2, '2022-12-13', '5:39', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 9, 1, '2023-07-14', '1:27', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 6, 1, '2023-08-05', '23:28', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 8, 2, '2023-10-16', '15:10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 2, 2, '2023-06-26', '2:51', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Dumping data for Message table
INSERT INTO Message VALUES
    (1, 8, 4, 'duis at velit eu', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 2, 5, 'libero rutrum ac lobortis vel dapibus at diam', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 9, 7, 'elementum eu interdum eu tincidunt in leo maecenas', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 2, 5, 'eget rutrum at lorem integer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 9, 8, 'facilisi cras non velit nec nisi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 10, 9, 'volutpat erat quisque erat eros', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 1, 2, 'tortor duis mattis egestas metus', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 8, 2, 'blandit name nulla integer pede justo lacinia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 6, 7, 'hendrerit at vulputate vitae', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10, 5, 9, 'semper porta volutpat quam pede lobortis', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Assign certain users in User table to coaches
UPDATE User SET CoachID = 2 WHERE UserID = 5;
UPDATE User SET CoachID = 1 WHERE UserID = 2;
UPDATE User SET CoachID = 1 WHERE UserID = 9;
UPDATE User SET CoachID = 1 WHERE UserID = 7;
