const { login } = require("../controllers/login.js");

jest.mock("../sql_config/database.js"); // need this so it don't actually connect to the database
jest.mock("../dataAccess/user_db.js");
jest.mock("../utils/security.js");

const db_file = require("../dataAccess/user_db.js");
const security_file = require("../utils/security.js");
const bcrypt = require("bcrypt");

const res = {
  status: jest.fn(),
  send: jest.fn(),
};

const users = [
  {
    userID: 1,
    email: "bob@bob.com",
    role: "user",
    password: "password",
  },
];

describe("login", () => {
  db_file.findUserByEmail.mockImplementation((email) => {
    return users.find((user) => user.email === email);
  });

  it("should return 400 if email is wrong format", async () => {
    const req = {
      body: {
        email: "bob@@bob.com",
        password: "password",
      },
    };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 400,
      error: `${req.body.email}: is not valid email format`,
      message: "Unable to login",
    });
  });

  it("should return 404 if email is not in database", async () => {
    const req = {
      body: {
        email: "bob1@bob.com",
        password: "password",
      },
    };
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  it("should return 401 if wrong password", async () => {
    const req = {
      body: {
        email: "bob@bob.com",
        password: "password",
      },
    };
    bcrypt.compare = async () => false;
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      status: 401,
      error: "Password does not match the one with email: bob@bob.com",
      message: "Unable to login",
    });
  });

  it("should return 200 and return user obj", async () => {
    const req = {
      body: {
        email: "bob@bob.com",
        password: "password",
      },
    };
    const token = "token";
    const user = users[0];
    security_file.createUserJwt.mockImplementationOnce(() => token);
    bcrypt.compare = async () => true;

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "User logged in",
      user: { id: user.userID, email: user.email, role: user.role },
      token: token,
    });
  });
});
