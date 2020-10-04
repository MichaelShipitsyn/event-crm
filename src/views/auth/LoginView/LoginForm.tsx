import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, FormHelperText, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { loginRequestSaga } from 'store/auth/slice';

export const LoginForm: FC = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: 'admin@gmail.com',
        password: 'Password123',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values) => {
        dispatch(
          loginRequestSaga({ email: values.email, password: values.password })
        );
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Log In
            </Button>
          </Box>
          <Box mt={2}>
            <Alert severity="info">
              <div>
                Use <b>admin@gmail.com</b> and password <b>Password123</b>
              </div>
            </Alert>
          </Box>
        </form>
      )}
    </Formik>
  );
};
