import React from "react";
import { DataGrid, GridColumns, GridRowsProp, GridValidRowModel } from "@mui/x-data-grid";


export default function DataTable<T extends GridValidRowModel = any>({ data, columns }: {
  data: GridRowsProp<T>;
  columns: GridColumns<T>;
}) {
  // const columns: GridColumns = [
  //   { field: "name", headerName: "Name", width: 180, editable: true },
  //   { field: "age", headerName: "Age", type: "number", editable: true },
  //   {
  //     field: "dateCreated",
  //     headerName: "Date Created",
  //     type: "date",
  //     width: 180,
  //     editable: true,
  //   },
  //   {
  //     field: "lastLogin",
  //     headerName: "Last Login",
  //     type: "dateTime",
  //     width: 220,
  //     editable: true,
  //   },
  // ];

  // const rows: GridRowsProp<T> = [
  //   {
  //     id: 1,
  //     name: "ayush",
  //     age: 25,
  //     dateCreated: "2023-01-01",
  //     lastLogin: "2023-01-01",
  //   },
  //   {
  //     id: 2,
  //     name: "john",
  //     age: 36,
  //     dateCreated: "2023-01-01",
  //     lastLogin: "2023-01-01",
  //   },
  //   {
  //     id: 3,
  //     name: "robert",
  //     age: 19,
  //     dateCreated: "2023-01-01",
  //     lastLogin: "2023-01-01",
  //   },
  //   {
  //     id: 4,
  //     name: "jimmy",
  //     age: 28,
  //     dateCreated: "2023-01-01",
  //     lastLogin: "2023-01-01",
  //   },
  //   {
  //     id: 5,
  //     name: "syd",
  //     age: 23,
  //     dateCreated: "2023-01-01",
  //     lastLogin: "2023-01-01",
  //   },
  // ];

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        editMode="row"
        rows={data}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}
