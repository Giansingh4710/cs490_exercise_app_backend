const { getMeals, deleteMeal, createMeal } = require("../controllers/meals.js");

jest.mock("../sql_config/database.js"); // need this so it don't actually connect to the database
jest.mock("../dataAccess/meals_db.js");

const db_file = require("../dataAccess/meals_db.js");
const res = {
  status: jest.fn(),
  send: jest.fn(),
};

describe("getMeals", () => {
  const req = {
    userID: 1,
  };

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
  const req = {
    userID: 1,
    params: {
      mealID: 1,
    },
  };

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

describe("createMeal", () => {
  db_file.createMeal_DB.mockImplementation((body, date, id) => {
    if (body.dbError) {
      throw new Error("DB Error");
    }
    const the_insert_obj = { insertId: 3 };
    return the_insert_obj;
  });

  it("return 201 if creatMeal worked", async () => {
    const req = {
      userID: 1,
      body: {
        calories: 10,
        protein: 10,
        fat: 10,
      },
    };

    await createMeal(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      message: "Meal recorded",
      id: 3,
    });
  });

  it("return 400 wrong nutrition input", async () => {
    const req = {
      userID: 1,
      body: {
        calories: -10,
        protein: "bob",
        fat: 10,
      },
    };

    await createMeal(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 400,
        message: "Nutrients values must be integers and positive",
        details: "Error inserting meal into database",
      },
    });
  });

  it("return 500 createMeal_DB error", async () => {
    const req = {
      userID: 1,
      body: {
        calories: 10,
        protein: 10,
        fat: 10,
        dbError: true
      },
    };

    await createMeal(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "DB Error",
        details: "Error inserting meal into database",
      },
    });
  });
});
