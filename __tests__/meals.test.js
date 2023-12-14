const { getMeals, deleteMeal } = require("../controllers/meals.js");

jest.mock("../sql_config/database.js"); // need this so it don't actually connect to the database
jest.mock("../dataAccess/meals_db.js");

const db_file = require("../dataAccess/meals_db.js");
const res = {
  status: jest.fn(),
  send: jest.fn(),
};

const req = {
  userID: 1,
  params: {
    mealID: 1,
  },
};

describe("getMeals", () => {
  it("should return 200 if meals are found", async () => {
    db_file.getMealsForToday_DB.mockImplementationOnce(() => {});
    await getMeals(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return 500 if error getting meals", async () => {
    db_file.getMealsForToday_DB.mockImplementationOnce(() => {
      throw new Error("Error getting meals");
    });
    await getMeals(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "Error getting meals",
        details: "Error getting meals from database",
      },
    });
  });
});

describe("deleteMeal", () => {
  it("should return 200 if meal is deleted", async () => {
    db_file.deleteMeal_DB.mockImplementationOnce(() => {});
    await deleteMeal(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return 500 if error deleting meal", async () => {
    db_file.deleteMeal_DB.mockImplementationOnce(() => {
      throw new Error("Error deleting meal");
    });
    await deleteMeal(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "Error accessing database",
        details: "Error getting meals from database",
      },
    });
  });
});
