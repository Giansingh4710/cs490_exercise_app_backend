const Client = require('../models/Client');

class ClientRepository {
    async findByEmail(email) {
      return Client.findOne({ where: { email } });
    }
  
    async createClient(clientData) {
      return Client.create(clientData);
    }
    
    async updateClient(clientData, email){
        Client.update(clientData, {where: {Email: email}});
    }
  }
  
  module.exports = new ClientRepository();