import { Box, FormHelperText, TextField } from '@material-ui/core';
import { ButtonWithLoader } from 'components';
import { Formik } from 'formik';
import type { FC } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { loginRequest } from 'store/auth/thunks';
import * as Yup from 'yup';

export const LoginForm: FC = () => {
  const authMessageError = useSelector(
    (state: RootState) => state.auth.authMessageError
  );
  const isLoginRequestLoading = useSelector(
    (state: RootState) => state.auth.isLoginRequestLoading
  );
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Невалидный Email')
          .max(255)
          .required('Необходимо указать Email'),
        password: Yup.string().max(255).required('Необходимо указать пароль'),
      })}
      onSubmit={(values) => {
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
        touched,
        values,
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
          {authMessageError && (
            <Box mt={3}>
              <FormHelperText error>{authMessageError}</FormHelperText>
            </Box>
          )}
          <Box mt={2} position="relative">
            <ButtonWithLoader
              label="Вход"
              isLoading={isLoginRequestLoading}
              color="secondary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            />
          </Box>
        </form>
      )}
    </Formik>
  );
};
