import { Box } from '@mui/material';
import React from 'react'
import Header from '../../components/header/Header';
import newRequest from '../../state/newRequest';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@emotion/react';
import { ResponsiveChoropleth } from '@nivo/geo' 
import { geoData } from '../../state/goeData'


function Geography() {
  const theme = useTheme();
 
  // Customer  DATA 
  const { isLoading, error, data } = useQuery({
    queryKey: ["geography"],
    queryFn: () =>
    newRequest.get(`/client/geography/`).then((res) => {
      return res.data
    })
  }) 
  // console.log(data)

  return (
     <Box m='25px 35px'> 
      <Header 
        title='Geography' 
        subtitle="See Your Customers Geography"
      />
      <Box
        mt='40px'
        height='75vh'
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius='4px '
      >
        {
          isLoading
          ? 'loading...'
          : error
          ? 'something went wrong'
          : <ResponsiveChoropleth
          data={data}
          theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
          features={geoData.features}
          // colors="nivo"
          margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
          domain={[ 0, 60 ]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionScale={150}
          projectionTranslation={[ 0.45, 0.5 ]}
          projectionRotation={[ 0, 0, 0 ]}
          borderWidth={1.3}
          borderColor="#ffffff"
           legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: true,
                  translateX: 20,
                  translateY: -125,
                  itemsSpacing: 0,
                  itemWidth: 94,
                  itemHeight: 18,
                  itemDirection: 'left-to-right',
                  itemTextColor: theme.palette.secondary[200],
                  itemOpacity: 0.85,
                  symbolSize: 18,
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: theme.palette.background.alt,
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
        />
        }
        
      </Box>
    </Box>
  )
}

export default Geography