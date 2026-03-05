import axios, { AxiosResponse } from "axios";

import { config } from "./config";

// Contact data structure
export interface IContact { _id?: number, name: string, email: string }


// Contacts AJAX worker — makes HTTP requests to the server for contact operations
export class Worker {


    // Get all contacts via AJAX
    public async listContacts(): Promise<IContact[]> {

        console.log("Contacts.Worker.listContacts()");

        const response: AxiosResponse = await axios.get(`${config.serverAddress}/contacts`);
        return response.data;

    }


    // Add a new contact via AJAX
    public async addContact(inContact: IContact): Promise<IContact> {

        console.log("Contacts.Worker.addContact()", inContact);

        const response: AxiosResponse = await axios.post(`${config.serverAddress}/contacts`, inContact);
        return response.data;

    }


    // Delete a contact via AJAX
    public async deleteContact(inID): Promise<string | void> {

        console.log("Contacts.Worker.deleteContact()", inID);

        await axios.delete(`${config.serverAddress}/contacts/${inID}`);

    }


    // Update an existing contact via AJAX (Additional Feature)
    public async updateContact(inContact: IContact): Promise<IContact> {

        console.log("Contacts.Worker.updateContact()", inContact);

        const response: AxiosResponse = await axios.put(`${config.serverAddress}/contacts`, inContact);
        return response.data;

    }


}
