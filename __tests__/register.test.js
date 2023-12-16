const { storeSurvey, registerAccount } = require("../controllers/register.js");

jest.mock("../dataAccess/user_db.js");
jest.mock("../sql_config/database.js");
jest.mock("../utils/security.js");

const security_file = require("../utils/security.js");
const db_file = require("../dataAccess/user_db.js");
const bcrypt = require("bcrypt");

const res = {
  status: jest.fn(),
  send: jest.fn(),
};

const users = [
  {
    userID: 1,
    email: "bobNew@bob.com",
    role: "user",
    password: "password",
  },
];

describe("trying to storeSurvey", () => {
  let req;
  beforeEach(() => {
    req = {
      "body": {
        "firstName": "Jon",
        "lastName": "Doe",
        "email": "bob@bob.com",
        "phoneNum": "1234567890",
        "dob": "2020-01-01",
        "gender": "Male",
        "weight": "150",
        "height": "72",
        "role": "Client", // Client or Coach or Admin?
        "activityLevel": "High", // Low, Moderate, High
        "goal": "Gain Weight", // 'Select Goal', 'Lose Weight', 'Gain Weight', 'Maintain Weight', 'Train for Sport',
        "streetAddress": "1234 Main St",
        "city": "San Diego",
        "state": "CA",
        "zipCode": "92122",
      },
    };
  });

  it("should update user survey info and send 200 status code", async () => {
    req.body.dob = "2000-01-01"; // old enough to register
    db_file.updateUser.mockImplementationOnce();
    await storeSurvey(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("too young to register. should send 403 status code", async () => {
    await storeSurvey(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        details: "Unable to update user and storeSurvey",
        message: "3: is less than 8. Too young to register",
        status: 403,
      },
    });
  });

  it("handle db error. should send 404 status code", async () => {
    req.body.dob = "2000-01-01"; // old enough to register
    const errorMessage = "Some error message";
    db_file.updateUser.mockImplementationOnce(() => {
      throw new Error(errorMessage);
    });

    await storeSurvey(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      error: {
        status: 404,
        message: errorMessage,
        details: "Unable to update user and storeSurvey",
      },
    });
  });
});

describe("add new user by registerAccount", () => {
  let req;
  beforeEach(() => {
    req = {
      "body": {
        "firstName": "Jon",
        "lastName": "Doe",
        "email": "bob@bob.com",
        "phoneNum": "1234567890",
        "dob": "2020-01-01",
        "gender": "Male",
        "weight": "150",
        "height": "72",
        "role": "Client", // Client or Coach or Admin?
        "activityLevel": "High", // Low, Moderate, High
        "goal": "Gain Weight", // 'Select Goal', 'Lose Weight', 'Gain Weight', 'Maintain Weight', 'Train for Sport',
        "streetAddress": "1234 Main St",
        "city": "San Diego",
        "state": "CA",
        "zipCode": "92122",
      },
    };
  });

  db_file.findUserByEmail.mockImplementation((email) => {
    return users.find((user) => user.email === email);
  });

  it("should update user survey info and send 201 status code", async () => {
    const userID = 2;
    const token = "token";

    bcrypt.hash = async () => "fakeHash";
    db_file.registerAccount_DB.mockImplementationOnce((obj) => {
      return { insertId: userID };
    });
    security_file.createUserJwt.mockImplementationOnce(() => token);
    await registerAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      user: {
        id: userID,
        email: req.body.email,
        role: null,
      },
      token: token,
      message: "User registered",
    });
  });

  it("wrong email 422 error", async () => {
    const req = {
      body: {
        email: "bob@@bob.com",
      },
    };
    await registerAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith({
      error: `${req.body.email}: is not valid email format`,
      message: "Unable to create user and registerAccount",
    });
  });

  it("User already exists 500 error", async () => {
    users[0].email = req.body.email;
    await registerAccount(req, res);
    expect(res.send).toHaveBeenCalledWith({
      error: `${req.body.email}: is already registered`,
      message: "Unable to create user and registerAccount",
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
