import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export default function AwsTable({ data, months, service, fromDate, toDate }) {
  let rows = [];

  if (
    Array.isArray(data) &&
    months !== 0 &&
    service !== 0 &&
    fromDate !== 0 &&
    toDate !== 0
  ) {
    rows = data.map((detail, index) => ({
      id: index + 1,
      accountId: detail.accountId,
      startDate: detail.startDate,
      endDate: detail.endDate,
      service: detail.service,
      amount: detail.amount,
    }));
  }
  // console.log(data, 'daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaata')

  const columns = [
    {
      field: "id",
      headerName: "S No",
      width: 150,
    },
    {
      field: "accountId",
      headerName: "Account Id",
      width: 250,
    },
    {
      field: "startDate",
      headerName: "Date From",
      width: 150,
    },
    {
      field: "endDate",
      headerName: "Date To",
      width: 200,
    },
    {
      field: "service",
      headerName: "Service Name",
      width: 400,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 110,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "20px" }}></div>
      <div style={{ flex: 1, height: "100%", width: "100% !important" }}>
        {rows.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 25, 50]}
            disableSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            experimentalFeatures={{ ariaV7: true }}
          // sx={{
          //   "&.MuiDataGrid-withBorderColor":{
          //     backgroundColor:"gray"
          //   }
          // }}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            No data available
          </div>
        )}
      </div>
    </Box>
  );
}
