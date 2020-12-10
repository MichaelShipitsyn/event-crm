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
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
  Divider,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon, XCircle as XIcon } from 'react-feather';

type Props = {
  isOpen: boolean;
  editableEmployee: User | null;
  onClose: () => void;
};

const useStyles = makeStyles(() => ({}));

export const EmployeeCard: FC<Props> = ({
  isOpen,
  editableEmployee,
  onClose
}) => {
  const classes = useStyles();

  const [employee, setEmployee] = useState<{ [p: string]: any }>({});

  useEffect(() => {
    if (editableEmployee) {
      setEmployee(editableEmployee);
    }
  }, [editableEmployee]);

  const handleEmployeeChange = (field: string, value: any) => {
    const newEmployee: { [p: string]: any } = { ...employee, [field]: value };
    setEmployee(newEmployee);
  };

  return (
    <>
      {!!editableEmployee && (
        <Drawer
          anchor="right"
          onClose={onClose}
          open={isOpen}
          variant="temporary"
        >
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <Box
              px={3}
              py={1}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4" color="textPrimary">
                {getUserFullName(editableEmployee)}
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
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button color="secondary" variant="contained">
                Search
              </Button>
            </Box>
            <Box mt={4}>123</Box>
          </PerfectScrollbar>
        </Drawer>
      )}
    </>
  );
};
