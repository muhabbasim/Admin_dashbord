import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import newRequest from '../../state/newRequest'
import { Box } from '@mui/material'
import Header from '../../components/header/Header'
import { useTheme } from '@emotion/react'
import { DataGrid } from '@mui/x-data-grid'
import DataGridToolbar from '../../components/dataGridToolbar/DataGridToolbar'

function Transactions() {
  const theme = useTheme();

  // values to be sent to the backend
  const [pageSize, setPageSize] = useState(20);
  // const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");

  // Customer  DATA 
  const { isLoading, data } = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
    newRequest.get(`/client/transactions/`).then((res) => {
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
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$ ${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m='25px 35px'> 
      <Header 
        title='Transactions' 
        subtitle="See Your Customers Transactions"
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
          rows={( data && data.transactions || [])}
          columns={ columns }
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          pageSizeOptions={[10, 50, 100]}
          // rowCount={ data && data.total || 0 }
        
          // toolbar
          components={{Toolbar: DataGridToolbar}}
          componentsProps={{
            toolbar: { setSearch, setSearchInput, searchInput }
          }}
        >
          
        </DataGrid>
      </Box>
    </Box>
  )
}

export default Transactions