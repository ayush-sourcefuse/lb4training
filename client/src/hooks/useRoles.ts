import { useQuery } from "react-query";
import Roles from "../sdk/roles";
import { GetAllRoles } from "../types/ApiResponses";

export default function useRoles() {
  const rolesApi = new Roles();
  const { data: roles, isLoading: isLoadingRoles } = useQuery(
    "roles",
    async () => {
      const allRolesApiResponse = await rolesApi.getAllRoles();
      return allRolesApiResponse.data;
    },
    {
      initialData: [],
    }
  );

  return {
    roles: roles ?? [] as GetAllRoles[],
    isLoadingRoles,
  };
}
