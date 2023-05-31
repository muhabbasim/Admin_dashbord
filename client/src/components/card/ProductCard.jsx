import { useTheme } from '@emotion/react'
import { Button, Card, CardActions, CardContent, Collapse, Rating, Typography } from '@mui/material'
import React, { useState } from 'react'

function ProductCard({ product }) {
  const { category, name, rating, price, description, stat, supply, _id } = product
  const theme = useTheme()

  const [ isExpanded, setIsExpanded ] = useState(false)

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '5px'
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14}} color={theme.palette.secondary[300]} gutterBottom>
          {category}
        </Typography>
        <Typography variant='h5' component='div' m="10px 0">
          {name}
        </Typography>
        <Typography sx={{ mb:'10px'}} color={theme.palette.secondary[300]}>
          $ {Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant='body2'>{description}</Typography>
      </CardContent>

      <CardActions>
        <Button 
          size="small"
          variant='primary'
          onClick={()=> setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>

      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>supply left: {supply}</Typography>
          <Typography>Yearly Sales This Year: {stat.yearlySalesTotal}</Typography>
          <Typography> Yearly Unit Sold This Year: {stat.yearlyTotalSoldUnit}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default ProductCard