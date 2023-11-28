const Client = require("../models/Client");
const { createUserJwt } = require("../utils/tokens");

class ClientRepository {
  async findByEmail(email) {
    return await Client.findOne({ where: { email } });
  }

  async createClient(clientData) {
    // If registration is successful, create the user's web token
    const newUser = await Client.create(clientData); // create the new user
    const token = createUserJwt(newUser); // generate a new JWT for the user

    return { user: newUser, token: token };
  }

  async updateClient(clientData, email) {
    Client.update(clientData, { where: { Email: email } });
  }
}

module.exports = new ClientRepository();
