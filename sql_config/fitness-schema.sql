-- Check if database exists and delete it if it does
DROP DATABASE IF EXISTS fitnessDB;
-- Initialize a new `fitnessDB` database
CREATE DATABASE fitnessDB;
USE fitnessDB;


-- Table structure for User table
CREATE TABLE User (
    -- Create primary and foreign key columns
    userID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    coachID INT UNSIGNED DEFAULT NULL,
    -- Create user data columns
    firstName VARCHAR(32),
    lastName VARCHAR(32),
    email VARCHAR(256) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    phoneNum VARCHAR(16),
    streetAddress VARCHAR(64),
    city VARCHAR(32),
    state VARCHAR(32),
    zipCode VARCHAR(16),
    role VARCHAR(16),
    gender VARCHAR(16),
    dob date,
    weight INT,
    height INT,
    activityLevel VARCHAR(32),
    photo MEDIUMBLOB,
    -- Add timestamp columns for creation and last update
    created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    lastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key
    PRIMARY KEY (userID)
);


-- Table structure for Coach table
CREATE TABLE Coach (
    -- Create primary and foreign key columns
    coachID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userID INT UNSIGNED NOT NULL,
    -- Create coach data columns
    specialties VARCHAR(256),
    cost float,
    -- Add timestamp columns for creation and last update
    created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    lastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key
    PRIMARY KEY (coachID)
);


-- Define FK constraint on User table for coachID
ALTER TABLE User ADD
	CONSTRAINT UserCoachFK 
        FOREIGN KEY (coachID)
        REFERENCES Coach(coachID)
        ON DELETE SET NULL;

-- Define FK constraint on Coach table for userID
ALTER TABLE Coach ADD
	CONSTRAINT CoachUserFK 
        FOREIGN KEY (userID) 
        REFERENCES User(userID)
        ON DELETE CASCADE;


-- Table structure for Goal table
CREATE TABLE Goal (
    -- Create primary and foreign key columns
    goalID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userID INT UNSIGNED NOT NULL,
    -- Create goal data columns
    goalType VARCHAR(32) NOT NULL,
    description TEXT,
    weightGoal INT,
    dailyWater FLOAT,
    dailyCalories INT,
    -- Add timestamp columns for creation and last update
    created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    lastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraint
    PRIMARY KEY (goalID),
    CONSTRAINT GoalUserFK 
        FOREIGN KEY (userID) 
        REFERENCES User(userID)
        ON DELETE CASCADE
);

-- Table structure for WeightProgress table
CREATE TABLE WeightProgress (
    -- Create primary and foreign key columns
    progressID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userID INT UNSIGNED NOT NULL,
    -- Create goal data columns
    weight INT NOT NULL,
    date DATE NOT NULL,
    -- Add timestamp columns for creation and last update
    created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    lastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraint
    PRIMARY KEY (progressID),
    CONSTRAINT ProgressUserFK 
        FOREIGN KEY (userID) 
        REFERENCES User(userID)
        ON DELETE CASCADE
);


-- Table structure for WaterIntake table
CREATE TABLE WaterIntake (
    -- Create primary and foreign key columns
    waterID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userID INT UNSIGNED NOT NULL,
    -- Create water intake data columns
    date DATE NOT NULL,
    intakeAmount FLOAT NOT NULL,
    intakeUnit VARCHAR(32) NOT NULL,
    -- Add timestamp columns for creation and last update
    created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    lastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraint
    PRIMARY KEY (waterID),
    CONSTRAINT WaterUserFK 
        FOREIGN KEY (userID) 
        REFERENCES User(userID)
        ON DELETE CASCADE
);


-- Table structure for FoodIntake table
CREATE TABLE FoodIntake (
    -- Create primary and foreign key columns
    foodID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userID INT UNSIGNED NOT NULL,
    -- Create food intake data columns
    date DATE NOT NULL,
    foodName VARCHAR(32) NOT NULL,
    mealType VARCHAR(16) NOT NULL,
    calories INT NOT NULL,
    protein INT DEFAULT NULL,
    carbs INT DEFAULT NULL,
    fat INT DEFAULT NULL,
    -- Add timestamp columns for creation and last update
    created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    lastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraint
    PRIMARY KEY (foodID),
    CONSTRAINT FoodUserFK 
        FOREIGN KEY (userID) 
        REFERENCES User(userID)
        ON DELETE CASCADE
);


-- Table structure for Mentalstate table
CREATE TABLE Mentalstate (
    -- Create primary and foreign key columns
    stateID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userID INT UNSIGNED NOT NULL,
    -- Create mental state data columns
    date DATE NOT NULL,
    state VARCHAR(32) NOT NULL,
    -- Add timestamp columns for creation and last update
    created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    lastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraint
    PRIMARY KEY (stateID),
    CONSTRAINT stateUserFK 
        FOREIGN KEY (userID) 
        REFERENCES User(userID)
        ON DELETE CASCADE
);


-- Table structure for Exercise table
CREATE TABLE Exercise (
    -- Create primary key column
    exerciseID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    -- Create exercise data columns
    name VARCHAR(32) NOT NULL,
    muscleGroup VARCHAR(32),
    difficulty VARCHAR(32),
    equipment VARCHAR(32),
    type VARCHAR(32),
    metric VARCHAR(16),
    -- Add timestamp columns for creation and last update
    created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    lastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key
    PRIMARY KEY (exerciseID)
);


-- Table structure for WorkoutPlan table
CREATE TABLE WorkoutPlan (
    -- Create primary and foreign key columns
    planID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userID INT UNSIGNED NOT NULL,
    exerciseID INT UNSIGNED,
    -- Create workout plan data columns
    dayOfWeek VARCHAR(16) NOT NULL,
    reps INT NOT NULL,
    sets INT NOT NULL,
    weight FLOAT DEFAULT NULL,
    duration INT DEFAULT NULL,
    creator VARCHAR(16) NOT NULL,
    -- Add timestamp columns for creation and last update
    created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    lastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraints
    PRIMARY KEY (planID),
    CONSTRAINT PlanUserFK 
        FOREIGN KEY (userID) 
        REFERENCES User(userID)
        ON DELETE CASCADE,
    CONSTRAINT PlanExerciseFK 
        FOREIGN KEY (exerciseID) 
        REFERENCES Exercise(exerciseID)
        ON DELETE SET NULL
);


-- Table structure for Record table
CREATE TABLE Record (
    -- Create primary and foreign key columns
    recordID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    planID INT UNSIGNED,
    exerciseID INT UNSIGNED,
    -- Create record data columns
    date DATE NOT NULL,
    reps INT NOT NULL,
    sets INT NOT NULL,
    weight FLOAT DEFAULT NULL,
    duration INT DEFAULT NULL,
    -- Add timestamp columns for creation and last update
    created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    lastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraints
    PRIMARY KEY (RecordID),
    CONSTRAINT RecordPlanFK 
        FOREIGN KEY (planID) 
        REFERENCES WorkoutPlan(planID)
        ON DELETE SET NULL,
    CONSTRAINT RecordExerciseFK 
        FOREIGN KEY (exerciseID) 
        REFERENCES Exercise(exerciseID)
        ON DELETE SET NULL
);


-- Table structure for Request table
CREATE TABLE Request (
    -- Create primary and foreign key columns
    requestID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userID INT UNSIGNED,
    coachID INT UNSIGNED,
    -- Create request data columns
    status VARCHAR(16) NOT NULL,
    goals TEXT DEFAULT NULL,
    note TEXT DEFAULT NULL,
    -- Add timestamp columns for creation and last update
    created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    lastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraints
    PRIMARY KEY (RequestID),
    CONSTRAINT RequestUserFK 
        FOREIGN KEY (userID) 
        REFERENCES User(userID)
        ON DELETE SET NULL,
    CONSTRAINT RequestCoachFK 
        FOREIGN KEY (coachID)
        REFERENCES Coach(coachID)
        ON DELETE SET NULL
);

-- Table structure for CoachRequest table
CREATE TABLE CoachRequest (
    -- Create primary and foreign key columns
    coachRequestID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userID INT UNSIGNED,
    -- Create coachRequest data columns
    status VARCHAR(16) NOT NULL,
    specialties VARCHAR(256),
    cost float,
    -- Add timestamp columns for creation and last update
    created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    lastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraints
    PRIMARY KEY (CoachRequestID),
    CONSTRAINT CoachRequestUserFK 
        FOREIGN KEY (userID) 
        REFERENCES User(userID)
        ON DELETE SET NULL
);


-- Table structure for Appointment table
CREATE TABLE Appointment (
    -- Create primary and foreign key columns
    appointmentID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userID INT UNSIGNED,
    coachID INT UNSIGNED,
    -- Create appointment data columns
    date DATE NOT NULL,
    time TIME NOT NULL,
    -- Add timestamp columns for creation and last update
    created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    lastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraints
    PRIMARY KEY (appointmentID),
    CONSTRAINT appointmentUserFK 
        FOREIGN KEY (userID) 
        REFERENCES User(userID)
        ON DELETE SET NULL,
    CONSTRAINT appointmentCoachFK 
        FOREIGN KEY (coachID)
        REFERENCES Coach(coachID)
        ON DELETE SET NULL
);


-- Table structure for Message table
CREATE TABLE Message (
    -- Create primary and foreign key columns
    messageID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    senderID INT UNSIGNED,
    receiverID INT UNSIGNED,
    -- Create message data column
    content TEXT NOT NULL,
    -- Add timestamp columns for creation and last update
    created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    lastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraints
    PRIMARY KEY (messageID),
    CONSTRAINT SenderFK 
        FOREIGN KEY (senderID) 
        REFERENCES User(userID)
        ON DELETE SET NULL,
    CONSTRAINT ReceiverFK 
        FOREIGN KEY (receiverID) 
        REFERENCES User(userID)
        ON DELETE SET NULL
);
