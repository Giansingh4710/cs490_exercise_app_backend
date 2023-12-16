show tables;
use fitnessDB;

SELECT * From User;
Select * from Coach;


SELECT c.coachID, u.firstName, u.lastName 
	FROM Coach c INNER JOIN User u ON u.userID = c.coachID 
	GROUP BY c.coachID ORDER BY c.coachID;

SELECT c.coachID, u.firstName, u.lastName
FROM Coach c
INNER JOIN User u ON u.userID = c.userID
ORDER BY c.coachID;

SELECT state, JSON_ARRAYAGG(city) AS cities
    FROM User WHERE role = 'coach'
    GROUP BY state ORDER BY state ASC;
    
SELECT * from User;