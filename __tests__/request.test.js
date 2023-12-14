const {
  requestCoach,
  getOpenRequests,
  unansweredRequestsByCoach,
  getStatus,
} = require("../controllers/request.js");

jest.mock("../sql_config/database.js"); // need this so it don't actually connect to the database
jest.mock("../dataAccess/request_db.js");
jest.mock("../dataAccess/coach_db_access.js");
const db_file = require("../dataAccess/request_db.js");

const res = {
  status: jest.fn(),
  send: jest.fn(),
};

describe("requestCoach", () => {
  it("400 error, don't have data", async () => {
    const req = {
      body: {},
    };
    await requestCoach(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        message:
          "Required Fields to requestCoach: userID, CoachID, Goals, Notes",
        details: "Server Error while trying to requestCoach",
      },
    });
  });

  it("422 error, don't have right data", async () => {
    const req = {
      body: {
        userID: "",
        coachID: "-10",
        goals: "",
        note: "",
      },
    };
    await requestCoach(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        message:
          "Invalid CoachID(-10) and/or userID() (must be a positive integer)",
        details: "Server Error while trying to requestCoach",
      },
    });
  });

  it("401 error, don't not right user", async () => {
    const req = {
      body: {
        userID: 2,
        coachID: "-10",
        goals: "",
        note: "",
      },
      userID: 1,
    };
    await requestCoach(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        message:
          "userID in request(2) does not match userID of logged in user(1)",
        details: "Server Error while trying to requestCoach",
      },
    });
  });

  it("404 error, Coach no exist", async () => {
    const req = {
      body: {
        userID: 2,
        coachID: 10,
        goals: "",
        note: "",
      },
      userID: 2,
    };
    require("../dataAccess/coach_db_access.js").getCoachByID_DB
      .mockImplementationOnce(() => {
        const rows = [];
        return rows[0];
      });
    await requestCoach(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        message: "CoachID(10) does not exist",
        details: "Server Error while trying to requestCoach",
      },
    });
  });

  it("422 error, Coach already requested", async () => {
    const req = {
      body: {
        userID: 2,
        coachID: 10,
        goals: "",
        note: "",
      },
      userID: 2,
    };

    require("../dataAccess/coach_db_access.js").getCoachByID_DB
      .mockImplementationOnce(() => true);

    db_file.getRequests.mockImplementationOnce(() => [{ coachID: 10 }]);
    await requestCoach(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        message: "User(2) has already requested Coach(10)",
        details: "Server Error while trying to requestCoach",
      },
    });
  });

  it("500 error, DB error", async () => {
    const req = {
      body: {
        userID: 2,
        coachID: 10,
        goals: "",
        note: "",
      },
      userID: 2,
    };
    db_file.createRequest.mockImplementationOnce(() => {
      throw new Error("DB Error");
    });

    require("../dataAccess/coach_db_access.js").getCoachByID_DB
      .mockImplementationOnce(() => true);
    db_file.getRequests.mockImplementationOnce(() => []);
    await requestCoach(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        message: "DB Error",
        details: "Server Error while trying to requestCoach",
      },
    });
  });

  it("201 made request", async () => {
    const req = {
      body: {
        userID: 2,
        coachID: 10,
        goals: "",
        note: "",
      },
      userID: 2,
    };

    db_file.createRequest.mockImplementationOnce(() => {});
    require("../dataAccess/coach_db_access.js").getCoachByID_DB
      .mockImplementationOnce(() => true);
    db_file.getRequests.mockImplementationOnce(() => []);
    await requestCoach(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe("getOpenRequests", () => {
  const req = {
    body: {},
  };

  it("500 DB error", async () => {
    db_file.getPendingRequests.mockImplementationOnce(() => {
      throw new Error("DB Error");
    });
    await getOpenRequests(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        message: "DB Error",
        details: "Server Error while trying to getOpenRequests",
      },
    });
  });

  it("200 got requests", async () => {
    await getOpenRequests(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("getStatus", () => {
  const req = {
    query: {
      userid: 1,
      coachID: 1,
    },
  };

  it("500 DB error when getting status of request", async () => {
    db_file.getStatus_DB.mockImplementationOnce(() => {
      throw new Error("DB Error");
    });
    await getStatus(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "DB Error",
        details: "Error trying to get status in database.",
      },
    });
  });

  it("200 got status", async () => {
    await getStatus(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("unansweredRequestsByCoach", () => {
  const req = {
    query: {
      userid: 1,
      coachID: 1,
    },
  };

  it("500 DB error when getting status of request", async () => {
    db_file.unansweredRequestsByCoach_DB.mockImplementationOnce(() => {
      throw new Error("DB Error");
    });
    await unansweredRequestsByCoach(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        message: "DB Error",
        details: "Server Error while trying to get unansweredRequestsByCoach",
      },
    });
  });

  it("200 got status", async () => {
    await unansweredRequestsByCoach(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
