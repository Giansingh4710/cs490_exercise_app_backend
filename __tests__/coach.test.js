const {
  getCoachByID,
  getAllCoaches,
  searchByName,
  getSpecializations,
  getCities,
  getClientsOfCoach,
} = require("../controllers/coach.js");

jest.mock("../dataAccess/coach_db_access.js");

const db_file = require("../dataAccess/coach_db_access.js");
describe("Coach Controller", () => {});
