const { recordDailySurvey, dailyWeight } = require(
  "../controllers/logActivity.js",
);

jest.mock("../sql_config/database.js"); // need this so it don't actually connect to the database
jest.mock("../dataAccess/log_activity_db.js");
const db_file = require("../dataAccess/log_activity_db.js");

const res = {
  status: jest.fn(),
  send: jest.fn(),
};

describe("recordDailySurvey", () => {
  const req = {
    body: {
      waterData: {
        unit: "cups",
      },
    },
    userID: 1,
  };

  db_file.insertDailySurvey_DB.mockImplementationOnce(() => {});
  it("record survey successfully", async () => {
    db_file.dailySurveyIsCompleted_DB.mockImplementationOnce(() => false);
    await recordDailySurvey(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({
      status: 201,
      message: "Daily survey recorded",
      details: "Water intake, weight, and mental state recorded",
    });
  });

  it("already recorded suvrey today", async () => {
    db_file.dailySurveyIsCompleted_DB.mockImplementationOnce(() => true);
    await recordDailySurvey(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 400,
        message: "User already completed daily survey for today",
        details: "Error inserting into database",
      },
    });
  });

  it("wrong water unit when submitting survey", async () => {
    db_file.dailySurveyIsCompleted_DB.mockImplementationOnce(() => false);
    const temp = req.body.waterData.unit;
    req.body.waterData.unit = "cupss";
    await recordDailySurvey(req, res);
    req.body.waterData.unit = temp;
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "Unit: cupss not one of : cups, gallons, fl oz",
        details: "Error inserting into database",
      },
    });
  });

  it("error inserting daily survey", async () => {
    db_file.dailySurveyIsCompleted_DB.mockImplementationOnce(() => false);
    db_file.insertDailySurvey_DB.mockImplementationOnce(() => {
      throw new Error("DB error");
    });
    await recordDailySurvey(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "DB error",
        details: "Error inserting into database",
      },
    });
  });
});

describe("dailyWeight", () => {
  const db_res = {
    fromDB: "Yayyyy",
  };
  db_file.dailyWeight_DB.mockImplementation((userID) => {
    if (userID === -1) {
      throw new Error("DB Error");
    }
    return db_res;
  });

  it("status 200 all goof", async () => {
    const req = {
      query: {
        userID: 1,
      },
    };
    await dailyWeight(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(db_res);
  });

  it("status 500 DB error", async () => {
    const req = {
      query: {
        userID: -1,
      },
    };
    await dailyWeight(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "DB Error",
        details: "Error trying to get weightData in database.",
      },
    });
  });
});
