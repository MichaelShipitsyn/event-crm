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
import { XCircle as XIcon } from 'react-feather';

type Props = {
  initialEmployee: User;
  onClose: () => void;
};

const useStyles = makeStyles(() => ({}));

export const EmployeeCard: FC<Props> = ({ initialEmployee, onClose }) => {
  const [employee, setEmployee] = useState(initialEmployee);

  const handleEmployeeChange = (field: string, value: any) => {
    const newEmployee: User = { ...employee, [field]: value };
    setEmployee(newEmployee);
  };

  return (
    <Drawer anchor="right" open onClose={onClose} variant="temporary">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
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
        </Box>
      </PerfectScrollbar>
    </Drawer>
  );
};
