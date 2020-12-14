import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { User } from 'types/users';
import { getUserFullName } from 'utils/getUserFullName';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  SvgIcon,
  TextField,
  Typography,
  Divider,
  makeStyles
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { Check as CheckIcon, X as XIcon } from 'react-feather';

type Props = {
  initialEmployee: User;
  handleEmployeeSave: (employee: User) => void;
  onClose: () => void;
};

const useStyles = makeStyles(() => ({
  toggleButtonGroup: {
    display: 'flex',
    marginTop: '3px'
  },
  toggleButton: {
    width: '50%'
  },
  drawerContent: {
    overflowY: 'auto',
    height: '100%'
  }
}));

export const EmployeeCard: FC<Props> = ({
  initialEmployee,
  handleEmployeeSave,
  onClose
}) => {
  const { register, errors, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues: initialEmployee
  });
  const classes = useStyles();
  const [isAdmin, setIsAdmin] = useState(initialEmployee.is_admin);

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
      <div className={classes.drawerContent}>
        <Box px={3} py={1}>
          <TextField
            error={!!errors?.firstname}
            helperText={errors?.firstname && errors?.firstname.message}
            inputRef={register({
              required: 'Обязательное поле'
            })}
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
            inputRef={register({
              required: 'Обязательное поле'
            })}
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
            inputRef={register({
              required: 'Обязательное поле'
            })}
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
            inputRef={register({
              required: 'Обязательное поле'
            })}
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
            <ToggleButtonGroup
              classes={{ root: classes.toggleButtonGroup }}
              exclusive
              size="small"
              value={isAdmin}
              onChange={(event, value) => {
                setIsAdmin(!!value);
                setValue('is_admin', value);
              }}
            >
              <ToggleButton
                color="primary"
                value={true}
                className={classes.toggleButton}
              >
                Администратор
              </ToggleButton>
              <ToggleButton value={false} className={classes.toggleButton}>
                Сотрудник
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </div>
      <Box p={3} display="flex" justifyContent="space-between">
        <Button variant="contained">Отменить</Button>
        <Button
          onClick={handleSubmit((editedEmployee) =>
            handleEmployeeSave({ ...initialEmployee, ...editedEmployee })
          )}
          color="secondary"
          variant="contained"
          startIcon={
            <SvgIcon fontSize="small">
              <CheckIcon />
            </SvgIcon>
          }
        >
          Сохранить
        </Button>
      </Box>
    </Drawer>
  );
};
