import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { shades } from '../../theme';

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box
      mt="70px"
      p="40px 0"
      backgroundColor={neutral.light}
    >
      <Box
        width="80%"
        display="flex"
        margin="auto"
        justifyContent={'space-between'}
        flexWrap="wrap"
        rowGap="30px"
        columnGap={'clamp(20px,30px,40px'}
      >
        <Box width={'clamp(20%,30%,40%)'}>
          <Typography
            variant="h4"
            color={shades.secondary[500]}
            fontWeight={'bold'}
            mb="30px"
          >
            ECOMMER
          </Typography>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In unde
            eveniet commodi fuga, beatae officia?
          </div>
        </Box>

        <Box>
          <Typography
            variant="h4"
            fontWeight={'bold'}
            mb={'30px'}
          >
            About us
          </Typography>
          <Typography mb={'30px'}>Careers</Typography>
          <Typography mb={'30px'}>Our Story</Typography>
          <Typography mb={'30px'}>Terms & Conditions</Typography>
          <Typography mb={'30px'}>Careers</Typography>
        </Box>

        <Box>
          <Typography
            variant="h4"
            fontWeight={'bold'}
            mb={'30px'}
          >
            customer Care
          </Typography>
          <Typography mb={'30px'}>Help center</Typography>
          <Typography mb={'30px'}>Track your order</Typography>
          <Typography mb={'30px'}>Return & refund</Typography>
          <Typography mb={'30px'}>Corporate</Typography>
        </Box>

        <Box width={'clamp(20%,25%,30%)'}>
          <Typography
            variant="h4"
            fontWeight={'bold'}
            mb={'30px'}
          >
            Contact Us
          </Typography>
          <Typography mb={'30px'}>
            123 street of the world , New York USA
          </Typography>
          <Typography mb={'30px'}>(222)364-1408</Typography>
          <Typography mb={'30px'}>Email: something@Ecommer.com</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
