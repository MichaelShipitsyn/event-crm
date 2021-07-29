import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  SvgIcon,
  TextField,
  Typography,
} from '@material-ui/core';
import { ButtonWithLoader } from 'components';
import React, { useEffect, useState } from 'react';
import { Check as CheckIcon, X as XIcon } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { User } from 'types/user';
import { getUserFullName } from 'utils/getUserFullName';
import * as yup from 'yup';

import { StyledDrawerContent,StyledToggleButton, StyledToggleButtonGroup } from './styled'

type FormData = {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  is_admin: boolean;
};

type Props = {
  initialEmployee: User;
  onSave: (employee: User) => void;
  onClose: () => void;
};

const schema = yup.object().shape({
  firstname: yup.string().required('Обязательное поле'),
  lastname: yup.string().required('Обязательное поле'),
  phone: yup.string().required('Обязательное поле'),
  email: yup.string().email('Невалидный Email').required('Обязательное поле'),
});

export const EmployeeForm = ({ initialEmployee, onSave, onClose }: Props) => {
  const { register, errors, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues: initialEmployee,
    resolver: yupResolver(schema),
  });
  const [isAdmin, setIsAdmin] = useState(initialEmployee.is_admin);
  const updateEmployeeRequestStatus = useSelector(
    (state: RootState) => state.employee.updateEmployeeRequestStatus
  );

  useEffect(() => {
    register('is_admin');
  }, [register]);

  return (
    <Drawer anchor="right" open onClose={onClose} variant="temporary">
      <Box
        p={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" color="textPrimary">
          {getUserFullName(initialEmployee)}
        </Typography>
        <IconButton onClick={onClose}>
          <SvgIcon fontSize="small">
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Box>
      <Divider light variant="fullWidth" />
      <StyledDrawerContent>
        <Box px={3} py={1}>
          <TextField
            error={!!errors?.firstname}
            helperText={errors?.firstname && errors?.firstname.message}
            inputRef={register}
            fullWidth
            label="Имя"
            margin="normal"
            name="firstname"
            type="text"
            variant="outlined"
          />
          <TextField
            error={!!errors?.lastname}
            helperText={errors?.lastname && errors?.lastname.message}
            inputRef={register}
            fullWidth
            label="Фамилия"
            margin="normal"
            name="lastname"
            type="text"
            variant="outlined"
          />
          <TextField
            error={!!errors?.phone}
            helperText={errors?.phone && errors?.phone.message}
            inputRef={register}
            fullWidth
            label="Телефон"
            margin="normal"
            name="phone"
            type="text"
            variant="outlined"
          />
          <TextField
            error={!!errors?.email}
            helperText={errors?.email && errors?.email.message}
            inputRef={register}
            fullWidth
            label="Электронная почта"
            margin="normal"
            name="email"
            type="text"
            variant="outlined"
          />
          <Box mt={1}>
            <Typography gutterBottom variant="caption">
              Уровень доступа
            </Typography>
            <StyledToggleButtonGroup
              exclusive
              size="small"
              value={isAdmin}
              onChange={(event: React.MouseEvent, value: string) => {
                setIsAdmin(!!value);
                setValue('is_admin', value);
              }}
            >
              <StyledToggleButton
                color="primary"
                value
              >
                Администратор
              </StyledToggleButton>
              <StyledToggleButton value={false}>
                Сотрудник
              </StyledToggleButton>
            </StyledToggleButtonGroup>
          </Box>
        </Box>
      </StyledDrawerContent>
      <Box p={3} display="flex" justifyContent="space-between">
        <Button variant="contained">Отменить</Button>
        <ButtonWithLoader
          isLoading={updateEmployeeRequestStatus === 'loading'}
          label="Сохранить"
          disabled={Object.keys(errors).length !== 0}
          onClick={handleSubmit((editedEmployee: FormData) =>
            onSave({ ...initialEmployee, ...editedEmployee })
          )}
          color="secondary"
          variant="contained"
          startIcon={
            <SvgIcon fontSize="small">
              <CheckIcon />
            </SvgIcon>
          }
        />
      </Box>
    </Drawer>
  );
};
