import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  CircularProgress
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from 'store/auth/thunks';
import { RootState } from 'store';

const useStyles = makeStyles((theme) => {
  return {
    buttonProgress: {
      color: theme.palette.success.main,
      position: 'absolute',
      top: '50%',
      right: '15px',
      marginTop: -12,
      marginLeft: -12
    }
  };
});

export const LoginForm: FC = () => {
  const classes = useStyles();
  const requestError = useSelector(
    (state: RootState) => state.global.requestError
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
          <Box mt={2} position="relative">
            <Button
              color="secondary"
              disabled={isLoginRequestLoading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Войти
            </Button>
            {isLoginRequestLoading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
};
