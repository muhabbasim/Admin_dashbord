import React from 'react'
import FlexBetween from '../flex_between/FlexBetween'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid'
// import { IconButton, InputAdornment, TextField } from '@mui/material'
// import { Search } from "@mui/icons-material";
// import { useTheme } from '@emotion/react';

function DataGridToolbar({ searchInput, setSearchInput, setSearch }) {
  // const theme = useTheme();

  return (
    <GridToolbarContainer>
      <FlexBetween width='100%'>

        <FlexBetween>
          <GridToolbarColumnsButton/>
          <GridToolbarDensitySelector/>
          <GridToolbarExport/>
        </FlexBetween>

        {/* <TextField
          label="search..."
          sx={{ mb:"5px", width: '250px'}}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          // variant='standard'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput('')
                  }}
                >
                  <Search/>
                </IconButton>
              </InputAdornment>
            )
          }}
        >

        </TextField> */}
      </FlexBetween>
    </GridToolbarContainer>
  )
}

export default DataGridToolbar