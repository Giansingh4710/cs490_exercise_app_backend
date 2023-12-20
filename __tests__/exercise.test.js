const {
  getAllExercises,
  searchExercise,
  disableExercise,
  enableExercise,
  createExercise,
  getExerciseData,
  getAllActiveExercises,
} = require(
  "../controllers/exercise.js",
);

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

  const req = {};

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

describe("getAllActiveExercises", () => {
  it("200 gets getAllActiveExercises", async () => {
    db_file.getAllActiveExercises_DB.mockImplementationOnce(() => {});
    await getAllActiveExercises(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("500 error getAllActiveExercises", async () => {
    db_file.getAllActiveExercises_DB.mockImplementationOnce(() => {
      throw new Error("DB error");
    });
    await getAllActiveExercises(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("searchExercise", () => {
  db_file.searchExercise_DB.mockImplementation((muscle, equ) => {
    if (muscle === "" || equ === "") {
      throw new Error("DB Error");
    }
    return {};
  });
  it("200 all good", async () => {
    const req = {
      query: {
        muscleGroup: "bob",
        equipment: "jones",
      },
    };
    await searchExercise(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({});
  });
  it("500 DB Error", async () => {
    const req = {
      query: {
        muscleGroup: "",
        equipment: "",
      },
    };
    await searchExercise(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "DB Error",
        details: "Error trying to searchExercise in database.",
      },
    });
  });
});

describe("disableExercise", () => {
  const req = {
    query: {
      exerciseID: 1,
    },
  };
  it("200 all good", async () => {
    db_file.disableExercise_DB.mockImplementationOnce(() => {});
    await disableExercise(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it("500 can't disable Exercise", async () => {
    db_file.disableExercise_DB.mockImplementationOnce(() => {
      throw new Error("DB error");
    });
    await disableExercise(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("enableExercise", () => {
  const req = {
    query: {
      exerciseID: 1,
    },
  };
  it("200 all good", async () => {
    db_file.enableExercise_DB.mockImplementationOnce(() => {});
    await enableExercise(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it("500 can't disable Exercise", async () => {
    db_file.enableExercise_DB.mockImplementation(() => {
      throw new Error("DB error");
    });
    await enableExercise(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("createExercise", () => {
  const req = {
    query: {
      exerciseID: 1,
    },
  };
  it("201 create exercise", async () => {
    db_file.createExercise_DB.mockImplementationOnce(() => {});
    await createExercise(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
  it("500 error creating exercise", async () => {
    db_file.createExercise_DB.mockImplementationOnce(() => {
      throw new Error("DB error");
    });
    await createExercise(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("getExerciseData", () => {
  const req = {
    params: {
      exerciseID: 1,
    },
  };
  it("200 got exercise data", async () => {
    db_file.getExerciseData_DB.mockImplementationOnce(() => {});
    await getExerciseData(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it("500 error got exercise data", async () => {
    db_file.getExerciseData_DB.mockImplementationOnce(() => {
      throw new Error("DB error");
    });
    await getExerciseData(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
