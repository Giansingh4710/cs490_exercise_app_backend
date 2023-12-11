const { storeSurvey, registerAccount } = require("../controllers/register.js");

jest.mock("../dataAccess/user_db.js");
jest.mock("../sql_config/database.js");
const db_file = require("../dataAccess/user_db.js");
const bcrypt = require("bcrypt");

const req = {
  body: {
    firstName: "Jon",
    lastName: "Doe",
    email: "bob@bob.com",
    phoneNum: "1234567890",
    dob: "2020-01-01",
    gender: "Male",
    weight: "150",
    height: "72",
    role: "Client", // Client or Coach or Admin?
    activityLevel: "High", // Low, Moderate, High
    goal: "Gain Weight", // 'Select Goal', 'Lose Weight', 'Gain Weight', 'Maintain Weight', 'Train for Sport',
    streetAddress: "1234 Main St",
    city: "San Diego",
    state: "CA",
    zipCode: "92122",
  },
};

const res = {
  status: jest.fn(),
  send: jest.fn(),
};

describe("trying to storeSurvey", () => {
  it("should update user survey info and send 200 status code", async () => {
    db_file.updateUser.mockImplementationOnce(
      (body, email) => {
        return { "fromMockUpdateUser": "mockUpdateUser" };
      },
    );

    await storeSurvey(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should handle errors and send a 404 status code", async () => {
    const errorMessage = "Some error message";
    db_file.updateUser.mockRejectedValueOnce(() => {
      throw new Error(errorMessage);
    });

    await storeSurvey(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Unable to update user and storeSurvey",
    });
  });
});

describe("add new user by registerAccount", () => {
  it("should update user survey info and send 201 status code", async () => {
    db_file.findUsersByEmail.mockImplementationOnce(
      (email) => {
        return [];
      },
    );

    const theCreatedUser = {
      user: { "email": "bob@bob.com", "userID": 2 },
      token: "token",
    };

    bcrypt.hash = async () => "fakeHash";
    db_file.createUser.mockImplementationOnce((obj) => {
      return theCreatedUser;
    });

    await registerAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(theCreatedUser);
  });

  it("wrong email 422 error", async () => {
    req.body.email = "wrongEmail";
    await registerAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.send).toHaveBeenCalledWith({
      error: `${req.body.email}: is not valid email format`,
      message: "Unable to create user and registerAccount",
    });
  });

  it("User alreday exists 500 error", async () => {
    req.body.email = "bob@bob.com";
    db_file.findUsersByEmail.mockImplementationOnce(
      (email) => {
        return [req.body.email];
      },
    );
    await registerAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: `${req.body.email}: is already registered`,
      message: "Unable to create user and registerAccount",
    });
  });
});
