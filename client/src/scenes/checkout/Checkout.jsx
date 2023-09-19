import React, { useState } from 'react';
import { Formik } from 'formik';
import { object, string, boolean } from 'yup';

import { shades } from '../../theme';
import { useSelector } from 'react-redux';

import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import Shipping from './Shipping';

import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';

const stripePromise = loadStripe(
  'pk_test_51Nj1yULfT3kaJwBMcsUOnwFLAWYyONHxfqRFJFBbjGmitGWO8jsNGf1ofYeT7zR9r9E0nd8J9dZlRU551yFI1R0g00Pwk5k4Rd'
);

const initialValues = {
  billingAddress: {
    firstName: '',
    lastName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: '',
    lastName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  email: '',
  phoneNumber: '',
};

const checkoutSchema = [
  object({
    isSameAddress: boolean(),
    billingAddress: object({
      firstName: string().required('required'),
      lastName: string().required('required'),
      country: string().required('required'),
      street1: string(),
      street2: string().required('required'),
      city: string().required('required'),
      state: string().required('required'),
      zipCode: string().required('required'),
    }),

    shippingAddress: object().when('isSameAddress', {
      is: false,
      then: object({
        firstName: string().required('Required'),
        lastName: string().required('Required'),
        country: string().required('Required'),
        street1: string().required('Required'),
        street2: string().required('Required'),
        city: string().required('Required'),
        state: string().required('Required'),
        zipCode: string().required('Required'),
      }),
    }),
  }),
  object({
    email: string().required('required'),
    phoneNumber: string().required('required'),
  }),
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // copies the billing address onto the shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue('shippingAddress', {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }
    actions.setTouched({});
  };

  async function makePayment(values) {
    const stripe = await stripePromise;

    const requestBody = {
      userName: [values.firstName, values.lastName].join(' '),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    const response = await fetch('http://localhost:1337/api/orders', {
      method: 'POST',
      headers: { 'COntent-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <Box
      width={'80%'}
      m={'100px auto'}
    >
      <Stepper
        activeStep={activeStep}
        sx={{ m: '20px 0' }}
      >
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              )}

              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                gap={'50px'}
              >
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: 'none',
                      color: 'white',
                      borderRadius: 0,
                      padding: '15px 40px',
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}

                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: 'none',
                    color: 'white',
                    borderRadius: 0,
                    padding: '15px 40px',
                  }}
                  // onClick={() => setActiveStep(activeStep - 1)}
                >
                  {!isFirstStep ? 'Next' : 'Passe Order'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
