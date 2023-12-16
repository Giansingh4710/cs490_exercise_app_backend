const {
  getCoachByID,
  getAllCoaches,
  searchCoachByName,
  searchCoachByAll,
  getSpecializations,
  getCities,
  getUsersOfCoach,
} = require("../controllers/coach.js");

jest.mock("../sql_config/database.js"); // need this so it don't actually connect to the database
jest.mock("../dataAccess/coach_db_access.js");
const db_file = require("../dataAccess/coach_db_access.js");

const req = {
  "params": {
    "coachID": 1,
  },
  "query": {
    "name": "a",
  },
  "userID": 1,
};

const res = {
  status: jest.fn(),
  send: jest.fn(),
};

const rows = [
  {
    "coachID": 1,
    "firstName": "Admin",
    "lastName": "Admin",
  },
  {
    "coachID": 2,
    "firstName": "Moselle",
    "lastName": "Penn",
  },
  {
    "coachID": 3,
    "firstName": "Rawley",
    "lastName": "Comins",
  },
];

describe("getCoachByID", () => {
  db_file.getCoachByID_DB.mockImplementationOnce((coachId) => {
    const the_coach_rows = [
      {
        "coachID": 1,
        "firstName": "Olivero",
        "lastName": "Casol",
        "city": "San Diego",
        "state": "California",
        "specialties": "Strength building",
      },
    ];
    const row = the_coach_rows.find((coach) => coach.coachID === coachId);
    return row;
  });

  it("should return a coach with the given ID", async () => {
    await getCoachByID(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("invalid coachID", async () => {
    req.params.coachID = -10;
    await getCoachByID(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 422,
        message:
          `Invalid coachID(${req.params.coachID}) (must be a positive integer)`,
        details: "Error accessing database.",
      },
    });
  });

  it("no coach of the ID", async () => {
    req.params.coachID = 9999999;
    await getCoachByID(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 404,
        message: `No Coach found with ID:${req.params.coachID}`,
        details: "Error accessing database.",
      },
    });
  });
});

describe("getAllCoaches", () => {
  db_file.getAllCoaches_DB.mockImplementationOnce(() => rows);

  it("should return all coaches", async () => {
    await getAllCoaches(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(rows);
  });

  it("error in DB getting all coaches", async () => {
    db_file.getAllCoaches_DB.mockImplementationOnce(() => {
      throw new Error("DB error");
    });
    await getAllCoaches(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "DB error",
        details: "Error trying to getAllCoaches from database.",
      },
    });
  });
});

describe("searchCoachByName", () => {
  function filterByName(name) {
    name = name.toLowerCase();
    const searched = rows.filter((coach) =>
      coach.firstName.toLowerCase().includes(name) ||
      coach.lastName.toLowerCase().includes(name)
    );
    return searched;
  }

  it("should return all searched coaches", async () => {
    db_file.searchCoachByName_DB.mockImplementationOnce((name) =>
      filterByName(name)
    );
    await searchCoachByName(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(filterByName(req.query.name));
  });

  it("should return error when all searched coaches", async () => {
    db_file.searchCoachByName_DB.mockImplementationOnce((name) => {
      throw new Error("DB error");
    });
    await searchCoachByName(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "DB error",
        details: "Error trying to searchCoachByName from database.",
      },
    });
  });
});

describe("searchCoachByAll", () => {
  it("should return all searched coaches", async () => {
    db_file.searchCoachByAll_DB.mockImplementationOnce((a, b, c, d, e) => rows);
    await searchCoachByAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(rows);
  });

  it("should return error all searched coaches", async () => {
    db_file.searchCoachByAll_DB.mockImplementationOnce((a, b, c, d, e, f) => {
      throw new Error("DB error");
    });
    await searchCoachByAll(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "DB error",
        details: "Error trying to searchCoachByAll from database.",
      },
    });
  });
});

describe("getSpecializations", () => {
  const specs = [
    {
      "specialties": "Strength building",
    },
    {
      "specialties": "weight loss",
    },
    {
      "specialties": "Muscle building",
    },
    {
      "specialties": "weight gain",
    },
    {
      "specialties": "Stamina building",
    },
  ];

  it("should return all specialties", async () => {
    db_file.getSpecializations_DB.mockImplementationOnce(() => specs);
    await getSpecializations(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(specs);
  });

  it("should return error when getting all specialties", async () => {
    db_file.getSpecializations_DB.mockImplementationOnce(() => {
      throw new Error("DB error");
    });
    await getSpecializations(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "DB error",
        details: "Error trying to getSpecializations from database.",
      },
    });
  });
});

describe("getCities", () => {
  const cities = [
    {
      "state": "California",
      "cities": "San Bernardino, San Diego, Santa Rosa",
    },
    {
      "state": "District of Columbia",
      "cities": "Washington",
    },
  ];

  it("should return all cities", async () => {
    db_file.getCities_DB.mockImplementationOnce(() => cities);
    await getCities(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(cities);
  });

  it("should return error when getting all cities", async () => {
    db_file.getCities_DB.mockImplementationOnce(() => {
      throw new Error("DB error");
    });
    await getCities(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "DB error",
        details: "Error trying to get states and cities from database.",
      },
    });
  });
});

describe("getUsersOfCoach", () => {
  const clients = [
    {
      "userID": 9,
      "firstName": "Nickie",
      "lastName": "Tyrie",
    },
    {
      "userID": 11,
      "firstName": "Rica",
      "lastName": "Birden",
    },
    {
      "userID": 12,
      "firstName": "Benoit",
      "lastName": "Heggman",
    },
  ];
  it("should return all clients of coach", async () => {
    const req = {
      userID: 1,
    };
    db_file.getUsersOfCoach_DB.mockImplementationOnce(() => clients);
    db_file.getCoachFromUserID.mockImplementationOnce(() => ({
      coachID: 123,
    }));
    await getUsersOfCoach(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(clients);
  });

  it("should return error when getting clients of coach", async () => {
    db_file.getCoachFromUserID.mockImplementationOnce(() => ({
      coachID: 123, // Add any necessary properties that your application expects
    }));
    db_file.getUsersOfCoach_DB.mockImplementationOnce(() => {
      throw new Error("DB error");
    });
    await getUsersOfCoach(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 500,
        message: "DB error",
        details: "Error trying to getUsersOfCoach from database.",
      },
    });
  });
});
