import { AxiosInstance } from "axios";
import { GetAllRoles } from "../types/ApiResponses";
import { ControllerEndpoints } from "../types/ControllerEndpoints";
import Client from "./client";

class Roles {
  private roleClient: AxiosInstance;
  constructor() {
    this.roleClient = new Client(ControllerEndpoints.ROLES).getInstance();
  }

  async getAllRoles() {
    return await this.roleClient.get<GetAllRoles[]>("/");
  }
}

export default Roles;
