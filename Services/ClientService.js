const clientRepository = require('../DataAccess/ClientRepository');

class ClientService {

    // register client
    async registerClient(clientData) {
        // check if email is being used
        const existingClient = await clientRepository.findByEmail(clientData.Email);
        if (existingClient) {
            throw new Error('Email is already in use');
        }

        return clientRepository.createClient(clientData);
    }

    /*
        Update Client Information
        Using to fill out client data in User table after registration form creates the user in the table with default values
     */
    async updateClientProfile(surveyData){
        const client = await clientRepository.findByEmail(surveyData.Email);
        if(client == null){
            throw new Error("Email is not registered");
        }
        return clientRepository.updateClient(surveyData, surveyData.Email);
    }

    // check for email and password
    async checkPassword(clientData){
        const client = await clientRepository.findByEmail(clientData.Email);
        if(client == null){
            throw new Error("User is not registered");
        }
        if(client.Password === clientData.Password){
            return true;
        }else{
            return false;
        }
    }

}

module.exports = new ClientService();