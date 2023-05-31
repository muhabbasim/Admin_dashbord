import React from 'react'
import newRequest from '../../state/newRequest'
import { useQuery } from '@tanstack/react-query'
import { Box, useTheme } from '@mui/material'
import Header from '../../components/header/Header'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector } from "react-redux";

function Performance() {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);

  // Product DATA 
  const { isLoading, data } = useQuery({
    queryKey: ["performance"],
    queryFn: () =>
    newRequest.get(`/management/performance/${userId}`).then((res) => {
      return res.data
    })
  }) 
  console.log(data)
  
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of roducts",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$ ${Number(params.value).toFixed(2)}`
    },

  ];
  

  return (
    <Box m='25px 35px'> 
      <Header 
        title='PERFORMANCE' 
        subtitle="Manage your performance'status"
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
            rows={(data && data.sales) || []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20, 30]}
            // checkboxSelection
        
          />
      </Box>
    </Box>
  )
}

export default Performance