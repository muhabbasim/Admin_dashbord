import React from "react";
import { Box, useMediaQuery } from "@mui/material";

import Header from "../../components/header/Header";
import newRequest from '../../state/newRequest'
import { useQuery } from '@tanstack/react-query'
import ProductCard from "../../components/card/ProductCard";


function Products() {

  const isNotMobile = useMediaQuery('(min-width: 1000px)')

  // Product DATA 
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
    newRequest.get(`/client/products/`).then((res) => {
      return res.data
    })
  }) 


  return (
    <Box m='25px 35px'> 
      <Header 
        title='Products' 
        subtitle="see your products & status"
      />

      { isLoading
        ? 'loading...'
        : error
        ? 'something went wrong'
        : <Box 
            mt= '40px' 
            display='grid'
            gridTemplateColumns='repeat(3, minmax(0, 1fr))'
            justifyContent='space-between'
            rowGap='20px'
            columnGap='1.33%'
            sx={{ "& > div": { gridColumn: isNotMobile ? undefined : 'span 4'} }} // & > div === the imediate child 
          >
          { data.map((product) => {
            return(
              <ProductCard 
                key={product._id}
                product={product}
              />
            )
          })}
        </Box>
      }

    </Box>
  )
}

export default Products