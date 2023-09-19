import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
} from '@mui/material';
import AddressForm from './AddressForm';

const Shipping = ({
  values,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
  touched,
}) => {
  return (
    <Box m="20px auto">
      {/* billing */}

      <Box>
        <Typography
          sx={{ mb: '15px' }}
          fontSize={'18px'}
        >
          Billing Information
        </Typography>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
        />
      </Box>
      <Box mb="20px">
        <FormControlLabel
          label="Same for shipping Address"
          control={
            <Checkbox
              defaultChecked
              value={values.shippingAddress.isSameAddress}
              onChange={() =>
                setFieldValue(
                  'shippingAddress.isSameAddress',
                  !values.shippingAddress.isSameAddress
                )
              }
            />
          }
        />
      </Box>
      {/* Shipping Form */}
      {!values.shippingAddress.isSameAddress && (
        <Box>
          <Typography
            sx={{ mb: '15px' }}
            fontSize={'18px'}
          >
            Shipping Information
          </Typography>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            touched={touched}
          />
        </Box>
      )}
    </Box>
  );
};

export default Shipping;
