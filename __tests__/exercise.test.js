const { getAllExercises } = require("../controllers/exercise.js");

jest.mock("../sql_config/database.js"); // need this so it don't actually connect to the database
jest.mock("../dataAccess/exercise_db.js");
const db_file = require("../dataAccess/exercise_db.js");

const req = {};

const res = {
  status: jest.fn(),
  send: jest.fn(),
};

describe("getAllExercises", () => {
  const allExercises = [
    {
      "exerciseID": 1,
      "name": "Push-up",
      "type": "Compound",
      "difficulty": "Beginner",
      "muscleGroup": "Chest",
      "equipment": "Bodyweight",
    },
    {
      "exerciseID": 2,
      "name": "Diamond Push Up",
      "type": "Compound",
      "difficulty": "Intermediate",
      "muscleGroup": "Chest",
      "equipment": "Bodyweight",
    },
  ];

  it("gets all exercises", async () => {
    db_file.getAllExercises_DB.mockImplementationOnce(() => allExercises);
    await getAllExercises(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(allExercises);
  });

  it("gives error when getting all exercises", async () => {
    db_file.getAllExercises_DB.mockImplementationOnce(() => {
      throw new Error("DB error");
    });
    await getAllExercises(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "DB error",
        details: "Error trying to get all exercises from the database.",
      },
    });
  });
});
