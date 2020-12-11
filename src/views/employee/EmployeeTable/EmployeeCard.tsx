import React, { useEffect, useState, SyntheticEvent } from 'react';
import type { FC } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { User } from 'types/users';
import { getUserFullName } from 'utils/getUserFullName';
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
import { PlusCircle as PlusCircleIcon, XCircle as XIcon } from 'react-feather';

type Props = {
  initialEmployee: User;
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
    maxHeight: '80vh',
    overflowY: 'auto'
  }
}));

export const EmployeeCard: FC<Props> = ({ initialEmployee, onClose }) => {
  const classes = useStyles();
  const [employee, setEmployee] = useState(initialEmployee);

  const handleEmployeeChange = (field: string, value: any) => {
    const newEmployee: User = { ...employee, [field]: value };
    setEmployee(newEmployee);
  };

  return (
    <Drawer anchor="right" open onClose={onClose} variant="temporary">
      <div>
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
          <Box mt={2} px={3} py={1}>
            <TextField
              fullWidth
              label="Имя"
              margin="normal"
              name="firstname"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('firstname', event.target.value)
              }
              value={employee.firstname}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Фамилия"
              margin="normal"
              name="lastname"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('lastname', event.target.value)
              }
              value={employee.lastname}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Телефон"
              margin="normal"
              name="phone"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('phone', event.target.value)
              }
              value={employee.phone}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Электронная почта"
              margin="normal"
              name="email"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('email', event.target.value)
              }
              value={employee.email}
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
                value={employee.is_admin}
                onChange={(event, value) =>
                  handleEmployeeChange('is_admin', value)
                }
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
          <Box mt={2} px={3} py={1}>
            <TextField
              fullWidth
              label="Имя"
              margin="normal"
              name="firstname"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('firstname', event.target.value)
              }
              value={employee.firstname}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Фамилия"
              margin="normal"
              name="lastname"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('lastname', event.target.value)
              }
              value={employee.lastname}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Телефон"
              margin="normal"
              name="phone"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('phone', event.target.value)
              }
              value={employee.phone}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Электронная почта"
              margin="normal"
              name="email"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('email', event.target.value)
              }
              value={employee.email}
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
                value={employee.is_admin}
                onChange={(event, value) =>
                  handleEmployeeChange('is_admin', value)
                }
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
          <Box mt={2} px={3} py={1}>
            <TextField
              fullWidth
              label="Имя"
              margin="normal"
              name="firstname"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('firstname', event.target.value)
              }
              value={employee.firstname}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Фамилия"
              margin="normal"
              name="lastname"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('lastname', event.target.value)
              }
              value={employee.lastname}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Телефон"
              margin="normal"
              name="phone"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('phone', event.target.value)
              }
              value={employee.phone}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Электронная почта"
              margin="normal"
              name="email"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('email', event.target.value)
              }
              value={employee.email}
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
                value={employee.is_admin}
                onChange={(event, value) =>
                  handleEmployeeChange('is_admin', value)
                }
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
          <Box mt={2} px={3} py={1}>
            <TextField
              fullWidth
              label="Имя"
              margin="normal"
              name="firstname"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('firstname', event.target.value)
              }
              value={employee.firstname}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Фамилия"
              margin="normal"
              name="lastname"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('lastname', event.target.value)
              }
              value={employee.lastname}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Телефон"
              margin="normal"
              name="phone"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('phone', event.target.value)
              }
              value={employee.phone}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Электронная почта"
              margin="normal"
              name="email"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('email', event.target.value)
              }
              value={employee.email}
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
                value={employee.is_admin}
                onChange={(event, value) =>
                  handleEmployeeChange('is_admin', value)
                }
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
          <Box mt={2} px={3} py={1}>
            <TextField
              fullWidth
              label="Имя"
              margin="normal"
              name="firstname"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('firstname', event.target.value)
              }
              value={employee.firstname}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Фамилия"
              margin="normal"
              name="lastname"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('lastname', event.target.value)
              }
              value={employee.lastname}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Телефон"
              margin="normal"
              name="phone"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('phone', event.target.value)
              }
              value={employee.phone}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Электронная почта"
              margin="normal"
              name="email"
              type="text"
              onChange={(event) =>
                handleEmployeeChange('email', event.target.value)
              }
              value={employee.email}
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
                value={employee.is_admin}
                onChange={(event, value) =>
                  handleEmployeeChange('is_admin', value)
                }
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
      </div>
      <Button
        color="secondary"
        variant="contained"
        startIcon={
          <SvgIcon fontSize="small">
            <PlusCircleIcon />
          </SvgIcon>
        }
      >
        Добавить сотрудника
      </Button>
    </Drawer>
  );
};
