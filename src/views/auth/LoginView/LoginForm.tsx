import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, FormHelperText, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { loginRequest } from 'store/auth/thunks';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootReducer';

export const LoginForm: FC = () => {
  const requestError = useSelector(
    (state: RootState) => state.global.requestError
  );
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Невалидный Email')
          .max(255)
          .required('Необходимо указать Email'),
        password: Yup.string().max(255).required('Необходимо указать пароль')
      })}
      onSubmit={async (values) => {
        dispatch(
          loginRequest({ email: values.email, password: values.password })
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
            helperText={touched.email && errors.email}
            label="Email"
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
            label="Пароль"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          {requestError && (
            <Box mt={3}>
              <FormHelperText error>{requestError}</FormHelperText>
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
              Войти
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};
