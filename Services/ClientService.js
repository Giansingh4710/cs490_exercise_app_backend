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
    



}

module.exports = new ClientService();