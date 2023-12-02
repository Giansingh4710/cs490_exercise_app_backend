-- Check if database exists and delete it if it does
DROP DATABASE IF EXISTS fitnessDB;
-- Initialize a new `fitnessDB` database
CREATE DATABASE fitnessDB;
USE fitnessDB;


-- Table structure for User table
CREATE TABLE User (
    -- Create primary and foreign key columns
    UserID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    CoachID INT UNSIGNED DEFAULT NULL,
    -- Create user data columns
    FirstName VARCHAR(32),
    LastName VARCHAR(32),
    Email VARCHAR(64) NOT NULL,
    Password VARCHAR(64) NOT NULL,
    PhoneNum VARCHAR(16),
    Street VARCHAR(64),
    City VARCHAR(32),
    State VARCHAR(32),
    Role VARCHAR(16),
    Gender VARCHAR(16),
    DOB date,
    Weight INT,
    Height INT,
    ActivityLevel VARCHAR(32),
    -- Add timestamp columns for creation and last update
    Created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key
    PRIMARY KEY (UserID)
);


-- Table structure for Coach table
CREATE TABLE Coach (
    -- Create primary and foreign key columns
    CoachID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    UserID INT UNSIGNED NOT NULL,
    -- Create coach data columns
    Specialties VARCHAR(256),
    Cost float,
    -- Add timestamp columns for creation and last update
    Created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key
    PRIMARY KEY (CoachID)
);


-- Define FK constraint on User table for CoachID
ALTER TABLE User ADD
	CONSTRAINT UserCoachFK 
        FOREIGN KEY (CoachID)
        REFERENCES Coach(CoachID)
        ON DELETE SET NULL;

-- Define FK constraint on Coach table for UserID
ALTER TABLE Coach ADD
	CONSTRAINT CoachUserFK 
        FOREIGN KEY (UserID) 
        REFERENCES User(UserID)
        ON DELETE CASCADE;


-- Table structure for Goal table
CREATE TABLE Goal (
    -- Create primary and foreign key columns
    GoalID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    UserID INT UNSIGNED NOT NULL,
    -- Create goal data columns
    GoalType VARCHAR(32) NOT NULL,
    Description TEXT,
    WeightGoal INT,
    DailyWater FLOAT,
    DailyCalories INT,
    -- Add timestamp columns for creation and last update
    Created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraint
    PRIMARY KEY (GoalID),
    CONSTRAINT GoalUserFK 
        FOREIGN KEY (UserID) 
        REFERENCES User(UserID)
        ON DELETE CASCADE
);


-- Table structure for WaterIntake table
CREATE TABLE WaterIntake (
    -- Create primary and foreign key columns
    WaterID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    UserID INT UNSIGNED NOT NULL,
    -- Create water intake data columns
    Date DATE NOT NULL,
    IntakeAmount FLOAT NOT NULL,
    IntakeUnit VARCHAR(32) NOT NULL,
    -- Add timestamp columns for creation and last update
    Created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraint
    PRIMARY KEY (WaterID),
    CONSTRAINT WaterUserFK 
        FOREIGN KEY (UserID) 
        REFERENCES User(UserID)
        ON DELETE CASCADE
);


-- Table structure for FoodIntake table
CREATE TABLE FoodIntake (
    -- Create primary and foreign key columns
    FoodID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    UserID INT UNSIGNED NOT NULL,
    -- Create food intake data columns
    Date DATE NOT NULL,
    FoodName VARCHAR(32) NOT NULL,
    MealType VARCHAR(16) NOT NULL,
    Calories INT NOT NULL,
    Protein INT DEFAULT NULL,
    Carbs INT DEFAULT NULL,
    Fat INT DEFAULT NULL,
    -- Add timestamp columns for creation and last update
    Created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraint
    PRIMARY KEY (FoodID),
    CONSTRAINT FoodUserFK 
        FOREIGN KEY (UserID) 
        REFERENCES User(UserID)
        ON DELETE CASCADE
);


-- Table structure for MentalState table
CREATE TABLE MentalState (
    -- Create primary and foreign key columns
    StateID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    UserID INT UNSIGNED NOT NULL,
    -- Create mental state data columns
    Date DATE NOT NULL,
    State VARCHAR(32) NOT NULL,
    -- Add timestamp columns for creation and last update
    Created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraint
    PRIMARY KEY (StateID),
    CONSTRAINT StateUserFK 
        FOREIGN KEY (UserID) 
        REFERENCES User(UserID)
        ON DELETE CASCADE
);


-- Table structure for Exercise table
CREATE TABLE Exercise (
    -- Create primary key column
    ExerciseID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    -- Create exercise data columns
    Name VARCHAR(32) NOT NULL,
    MuscleGroup VARCHAR(32),
    Difficulty VARCHAR(32),
    Type VARCHAR(32),
    -- Add timestamp columns for creation and last update
    Created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key
    PRIMARY KEY (ExerciseID)
);


-- Table structure for WorkoutPlan table
CREATE TABLE WorkoutPlan (
    -- Create primary and foreign key columns
    PlanID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    UserID INT UNSIGNED NOT NULL,
    ExerciseID INT UNSIGNED,
    -- Create workout plan data column
    DayOfWeek VARCHAR(16) NOT NULL,
    -- Add timestamp columns for creation and last update
    Created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraints
    PRIMARY KEY (PlanID),
    CONSTRAINT PlanUserFK 
        FOREIGN KEY (UserID) 
        REFERENCES User(UserID)
        ON DELETE CASCADE,
    CONSTRAINT PlanExerciseFK 
        FOREIGN KEY (ExerciseID) 
        REFERENCES Exercise(ExerciseID)
        ON DELETE SET NULL
);


-- Table structure for Record table
CREATE TABLE Record (
    -- Create primary and foreign key columns
    RecordID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PlanID INT UNSIGNED,
    ExerciseID INT UNSIGNED,
    -- Create record data columns
    Date DATE NOT NULL,
    Reps INT NOT NULL,
    Sets INT NOT NULL,
    Weight FLOAT DEFAULT NULL,
    Duration INT NOT NULL,
    -- Add timestamp columns for creation and last update
    Created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraints
    PRIMARY KEY (RecordID),
    CONSTRAINT RecordPlanFK 
        FOREIGN KEY (PlanID) 
        REFERENCES WorkoutPlan(PlanID)
        ON DELETE SET NULL,
    CONSTRAINT RecordExerciseFK 
        FOREIGN KEY (ExerciseID) 
        REFERENCES Exercise(ExerciseID)
        ON DELETE SET NULL
);


-- Table structure for Request table
CREATE TABLE Request (
    -- Create primary and foreign key columns
    RequestID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    UserID INT UNSIGNED,
    CoachID INT UNSIGNED,
    -- Create request data columns
    Status VARCHAR(16) NOT NULL,
    Goals TEXT DEFAULT NULL,
    Note TEXT DEFAULT NULL,
    -- Add timestamp columns for creation and last update
    Created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraints
    PRIMARY KEY (RequestID),
    CONSTRAINT RequestUserFK 
        FOREIGN KEY (UserID) 
        REFERENCES User(UserID)
        ON DELETE SET NULL,
    CONSTRAINT RequestCoachFK 
        FOREIGN KEY (CoachID)
        REFERENCES Coach(CoachID)
        ON DELETE SET NULL
);


-- Table structure for Appointment table
CREATE TABLE Appointment (
    -- Create primary and foreign key columns
    AppointmentID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    UserID INT UNSIGNED,
    CoachID INT UNSIGNED,
    -- Create appointment data columns
    Date DATE NOT NULL,
    Time TIME NOT NULL,
    -- Add timestamp columns for creation and last update
    Created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraints
    PRIMARY KEY (AppointmentID),
    CONSTRAINT AppointmentUserFK 
        FOREIGN KEY (UserID) 
        REFERENCES User(UserID)
        ON DELETE SET NULL,
    CONSTRAINT AppointmentCoachFK 
        FOREIGN KEY (CoachID)
        REFERENCES Coach(CoachID)
        ON DELETE SET NULL
);


-- Table structure for Message table
CREATE TABLE Message (
    -- Create primary and foreign key columns
    MessageID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    SenderID INT UNSIGNED,
    ReceiverID INT UNSIGNED,
    -- Create message data column
    Content TEXT NOT NULL,
    -- Add timestamp columns for creation and last update
    Created TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,
    LastUpdate TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    -- Define primary key and foreign key constraints
    PRIMARY KEY (MessageID),
    CONSTRAINT SenderFK 
        FOREIGN KEY (SenderID) 
        REFERENCES User(UserID)
        ON DELETE SET NULL,
    CONSTRAINT ReceiverFK 
        FOREIGN KEY (ReceiverID) 
        REFERENCES User(UserID)
        ON DELETE SET NULL
);