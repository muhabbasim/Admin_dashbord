import { useQuery } from '@tanstack/react-query'
import React from 'react'
import newRequest from '../../state/newRequest'
import { Box, useTheme } from '@mui/material'
import Header from '../../components/header/Header'
import { DataGrid } from "@mui/x-data-grid";

function Customer() {
  const theme = useTheme();

  // Customer  DATA 
  const { isLoading, data } = useQuery({
    queryKey: ["customers"],
    queryFn: () =>
    newRequest.get(`/client/customers/`).then((res) => {
      return res.data
    })
  }) 
  
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      // phone number formating
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2 $3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];
  
  return ( 
    <Box m='25px 35px'> 
      <Header 
        title='Costomers' 
        subtitle="See Your Customers & Status"
      />
      <Box 
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
        }}
      >
 
          <DataGrid
            loading={ isLoading }
            getRowId={ (row) => row._id }
            rows={ data || [] }
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20, 30]}
            checkboxSelection
          />
      </Box>
    </Box>
  )
}

export default Customer