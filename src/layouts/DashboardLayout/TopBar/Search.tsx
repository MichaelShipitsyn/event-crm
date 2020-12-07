import React, { useState } from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon, XCircle as XIcon } from 'react-feather';

interface Result {
  description: string;
  title: string;
}

const useStyles = makeStyles(() => ({
  drawer: {
    width: 500,
    maxWidth: '100%'
  }
}));

export const Search: FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState<string>('');
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [results, setResults] = useState<Result[]>([]);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleSearch = () => {
    console.log('handleSearch');
  };

  return (
    <>
      <Tooltip title="Search">
        <IconButton color="inherit" onClick={handleOpen}>
          <SvgIcon fontSize="small">
            <SearchIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Drawer
        anchor="right"
        classes={{ paper: classes.drawer }}
        onClose={handleClose}
        open={isOpen}
        variant="temporary"
      >
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          <Box p={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4" color="textPrimary">
                Search
              </Typography>
              <IconButton onClick={handleClose}>
                <SvgIcon fontSize="small">
                  <XIcon />
                </SvgIcon>
              </IconButton>
            </Box>
            <Box mt={2}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Search people &amp; places"
                value={value}
                variant="outlined"
              />
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                color="secondary"
                variant="contained"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
            <Box mt={4}>
              {isLoading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {results.map((result, i) => (
                    <Box key={i} mb={2}>
                      <Link
                        variant="h4"
                        color="textPrimary"
                        component={RouterLink}
                        to="/app"
                      >
                        {result.title}
                      </Link>
                      <Typography variant="body2" color="textPrimary">
                        {result.description}
                      </Typography>
                    </Box>
                  ))}
                </>
              )}
            </Box>
          </Box>
        </PerfectScrollbar>
      </Drawer>
    </>
  );
};
