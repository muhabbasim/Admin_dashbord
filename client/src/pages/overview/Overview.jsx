import React, { useState } from 'react'
import Header from '../../components/header/Header'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import OverviewChart from '../../components/overview_chart/OverviewChart'

function Overview() {

  const [ view, setView ] = useState('units')

  return (
    <Box m='25px 35px'> 
    <Header 
      title='Products' 
      subtitle="see your products & status"
    />
      <Box height='75vh'>
        <FormControl>
          <InputLabel>View</InputLabel>
          <Select 
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value='sales'>Sales</MenuItem>
            <MenuItem value='units'>Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  )
}

export default Overview