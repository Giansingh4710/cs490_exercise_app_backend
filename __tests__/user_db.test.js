const {
  findUsersByEmail,
  createUser,
  updateUser,
} = require("../dataAccess/user_db");

function generateRandomEmail(domain) {
  const randomString = Math.random().toString(36).substring(7);
  const email = `${randomString}@${domain}`;
  return email;
}

const randomEmail = generateRandomEmail("bobexampleforunittest.com");

describe("test database calls", () => {
  it("register createUser in DB", async () => {
    console.log(randomEmail);
    const insertObj = await createUser({
      email: randomEmail,
      hashedPass: "hashedPassword",
    });
    const emails = await findUsersByEmail(randomEmail);
    console.log(emails[0], "emails");
  });
});
