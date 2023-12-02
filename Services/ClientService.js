const clientRepository = require("../DataAccess/ClientRepository");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../sql_config/database.js");

class ClientService {
  // register client
  async registerClient(clientData) {
    // check if email is being used
    const existingClient = await clientRepository.findByEmail(clientData.Email);
    if (existingClient) {
      throw new Error("Email is already in use");
    }
    // hash password before saving the client
    const hashedPassword = await bcrypt.hash(
      clientData.Password,
      BCRYPT_WORK_FACTOR,
    );
    clientData.Password = hashedPassword;

    return clientRepository.createClient(clientData);
  }

  /*
        Update Client Information
        Using to fill out client data in User table after registration form creates the user in the table with default values
     */
  async updateClientProfile(surveyData) {
    const client = await clientRepository.findByEmail(surveyData.Email);
    if (client == null) {
      throw new Error("Email is not registered");
    }
    return clientRepository.updateClient(surveyData, surveyData.Email);
  }

  // check for email and password
  async checkPassword(clientData) {
    const client = await clientRepository.findByEmail(clientData.Email);
    if (client == null) {
      throw new Error("User is not registered");
    }
    // Compare provided password with the hashed password
    // if the passwords match, return the user
    const isMatch = await bcrypt.compare(clientData.Password, client.Password);
    if (isMatch) {
      return client;
    }
    return null;
  }

  async getUserIDByEmail(email) {
    try {
      const client = await clientRepository.findByEmail(email);
      if (client == null) {
        throw new Error("Unable to find account by email");
      }
      const clientData = client.get({ plain: true });
      return clientData.UserID;
    } catch (error) {
      throw new Error("Error access database");
    }
  }
}

module.exports = new ClientService();
