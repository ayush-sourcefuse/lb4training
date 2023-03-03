import React, { FC } from "react";
import { Box } from "@mui/system";
import DataTable from "../components/DataTable";
import { Typography } from "@mui/material";
import { GetAllRoles } from "../types/ApiResponses";
import useRoles from "../hooks/useRoles";

/*
[
    {
        "id": 1,
        "role": "SuperAdmin",
        "isActive": true,
        "createdAt": "2023-02-28T04:45:17.733Z",
        "updatedAt": "2023-02-28T04:45:17.733Z"
    },
    {
        "id": 3,
        "role": "Subscriber",
        "isActive": true,
        "createdAt": "2023-02-28T04:20:13.628Z",
        "updatedAt": "2023-02-28T04:20:13.628Z"
    }
]
*/

const Roles: FC = () => {
  const { roles, isLoadingRoles } = useRoles();
  console.log(roles, isLoadingRoles);
  return (
    <Box p={8}>
        <Box p={2}>
        <Typography variant="h4" fontWeight={600}>Roles</Typography>
        </Box>
      <DataTable<GetAllRoles> data={roles} columns={[
            { field: "role", headerName: "Role", width: 180, editable: true },
      ]} />
    </Box>
  );
};

export default Roles;
