import { ControllerEndpoints } from "./ControllerEndpoints";

export interface GetAllRoles {
  id: number;
  role: ControllerEndpoints;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
