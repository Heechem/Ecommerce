import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  IconButton,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addToCart } from '../../state';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Item from '../../components/Item';
import { useEffect, useState } from 'react';
import { shades } from '../../theme';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState('description');
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      { method: 'GET' }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getItems() {
    const items = await fetch(
      'http://localhost:1337/api/items?populate=image',
      { method: 'GET' }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]);

  return (
    <Box
      width={'80%'}
      m="80px auto"
    >
      <Box
        display={'flex'}
        flexWrap="wrap"
        columnGap="40px"
      >
        {/* Images */}
        <Box
          flex="1 1 40%"
          mb="40px"
        >
          <img
            alt={item?.name}
            width={'100%'}
            height={'100%'}
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            style={{ objectFit: 'contain' }}
          />
        </Box>

        {/* actions */}
        <Box
          flex={'1 1 50%'}
          mb={'40px'}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Link to={'/'}>Home/Item</Link>
            <Link to={'..'}>Prev</Link>
          </Box>
          <Box m={'65px 0 25px 0'}>
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography>{item?.attributes?.price}</Typography>
            <Typography mb={{ mt: '20px' }}>
              {item?.attributes?.longDescription}{' '}
            </Typography>
          </Box>

          <Box
            display={'flex'}
            alignItems={'center'}
            minHeight={'50px'}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              minHeight={'50px'}
            >
              {/* Count and Button */}
              <Box
                display={'flex'}
                alignItems={'center'}
                minHeight={'50px'}
                border={`1.5px solid ${shades.neutral[300]}`}
                mr={'20px'}
                p="2px 5px"
              >
                <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: '0 5px' }}>{count}</Typography>
                <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                sx={{
                  backgroundColor: '#222222',
                  color: 'white',
                  borderRadius: 0,
                  minWidth: '150px',
                  padding: '10px 40px',
                }}
                onClick={() =>
                  dispatch(addToCart({ item: { ...item, count } }))
                }
              >
                Add TO CART
              </Button>
            </Box>

            <Box>
              <Box
                m={'20px 0 5px 0'}
                display={'flex'}
              >
                <FavoriteBorderOutlinedIcon />
                <Typography sx={{ ml: '5px' }}>Add to wish list</Typography>
              </Box>
              <Typography>CATEGORIES: {item?.attributes?.categorie}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Information  */}

        <Box m="20px 0">
          <Tabs
            value={value}
            onChange={handleChange}
          >
            <Tab
              label="DESCRIPTION"
              value={'description'}
            />
            <Tab
              label="REVIEWS"
              value={'reviews'}
            />
          </Tabs>
        </Box>

        <Box
          display={'flex'}
          flexWrap={'wrap'}
          gap={'15px'}
        >
          {value === 'description' && (
            <div>{item?.attributes?.longDescription}</div>
          )}
          {value === 'reviews' && <div>reviews</div>}
        </Box>

        {/* Related Items */}
        <Box
          mt={'50px'}
          width={'100%'}
        >
          <Typography
            variant="h3"
            fontWeight={'bold'}
          >
            Related Products
          </Typography>
          <Box>
            <Box
              mt="20px"
              display={'flex'}
              flexWrap={'wrap'}
              columnGap={'1.33%'}
              justifyContent={'space-between'}
            >
              {items.slice(0, 4).map((item, i) => (
                <Item
                  key={`${item.name}-${i}`}
                  item={item}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
