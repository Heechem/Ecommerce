import { Box, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';

import { setItems } from '../../state';
import { useDispatch, useSelector } from 'react-redux';
import Item from '../../components/Item';
import { useEffect, useState } from 'react';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('all');
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery('(min-width:600px)');
  console.log('item', items);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetch(
      'http://localhost:1337/api/items?populate=image',
      { method: 'GET' }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []);

  const topRatedItem = items.filter(
    (item) => item.attributes.category === 'topRated'
  );
  const newArrivals = items.filter(
    (item) => item.attributes.category === 'newArrivals'
  );

  const bestSellers = items.filter(
    (item) => item.attributes.category === 'bestSellers'
  );

  return (
    <Box
      width="80%"
      margin="80px auto"
    >
      <Typography
        variant="h3"
        textAlign="center"
      >
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? 'block' : 'none' } }}
        sx={{
          m: '25px',
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
        }}
      >
        <Tab
          value="all"
          label="ALL"
        />
        <Tab
          value="newArrivals"
          label="NEW ARRIVALS"
        />
        <Tab
          value="bestSellers"
          label="BEST SELLERS"
        />
        <Tab
          value="topRated"
          label="TOP RATED"
        />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill,300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === 'all' &&
          items.map((item) => (
            <Item
              item={item}
              key={`${item.name}-${item.id}`}
            />
          ))}

        {value === 'newArrivals' &&
          newArrivals.map((item) => (
            <Item
              item={item}
              key={`${item.name}-${item.id}`}
            />
          ))}

        {value === 'bestSellers' &&
          bestSellers.map((item) => (
            <Item
              item={item}
              key={`${item.name}-${item.id}`}
            />
          ))}

        {value === 'topRated' &&
          topRatedItem.map((item) => (
            <Item
              item={item}
              key={`${item.name}-${item.id}`}
            />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
