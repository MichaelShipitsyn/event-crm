import { Box, Button, FormHelperText, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import type { FC } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { registerRequest } from 'store/auth/thunks';
import * as Yup from 'yup';

export const RegisterForm: FC = () => {
  const authMessageError = useSelector(
    (state: RootState) => state.auth.authMessageError
  );
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().max(255).required('Необходимо указать имя'),
        lastname: Yup.string().max(255).required('Необходимо указать фамилию'),
        email: Yup.string()
          .email('Невалидный Email')
          .max(255)
          .required('Необходимо указать Email'),
        password: Yup.string()
          .min(8, 'Пароль должен содержать не менее 8 символов')
          .max(255)
          .required('Необходимо указать пароль'),
      })}
      onSubmit={(values) => {
        dispatch(
          registerRequest({
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
          })
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
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            error={Boolean(touched.firstname && errors.firstname)}
            fullWidth
            helperText={touched.firstname && errors.firstname}
            label="Имя"
            margin="normal"
            name="firstname"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.firstname}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.lastname && errors.lastname)}
            fullWidth
            helperText={touched.lastname && errors.lastname}
            label="Фамилия"
            margin="normal"
            name="lastname"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.lastname}
            variant="outlined"
          />
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
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Зарегистрироваться
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};
