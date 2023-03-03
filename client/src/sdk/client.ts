import axios, { AxiosInstance } from "axios";
import { ControllerEndpoints } from "../types/ControllerEndpoints";

class Client {
  baseUrl: string;
  constructor(controllerEndpoint: ControllerEndpoints) {
    this.baseUrl = `${controllerEndpoint}`;
  }

  getInstance(): AxiosInstance {
    return axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_SERVER_PORT}/${this.baseUrl}`,
      headers: {
        "Content-type": "application/json",
      },
    });
  }
}

export default Client;
