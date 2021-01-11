import React, { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import {
  Box,
  Button,
  InputAdornment,
  SvgIcon,
  TextField,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

type Sort = 'updatedAt|desc' | 'updatedAt|asc' | 'orders|desc' | 'orders|asc';

interface SortOption {
  value: Sort;
  label: string;
}

const sortOptions: SortOption[] = [
  {
    value: 'updatedAt|desc',
    label: 'Last update (newest first)'
  },
  {
    value: 'updatedAt|asc',
    label: 'Last update (oldest first)'
  },
  {
    value: 'orders|desc',
    label: 'Total orders (high to low)'
  },
  {
    value: 'orders|asc',
    label: 'Total orders (low to high)'
  }
];

const useStyles = makeStyles(() => ({
  queryField: {
    width: 300
  },
  searchButton: {
    marginLeft: '10px'
  }
}));

export const TableFilters: FC = () => {
  const classes = useStyles();
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<Sort>(sortOptions[0].value);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setSort(event.target.value as Sort);
  };

  const handleSearch = (): void => {
    console.log(query);
  };

  return (
    <Box p={2} minHeight={56} display="flex" alignItems="center">
      <TextField
        label="Выбрать:"
        name="sort"
        onChange={handleSortChange}
        select
        SelectProps={{ native: true }}
        value={sort}
        variant="outlined"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
      <Box flexGrow={1} />
      <TextField
        className={classes.queryField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon fontSize="small" color="action">
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          )
        }}
        onChange={handleQueryChange}
        placeholder="Поиск..."
        value={query}
        variant="outlined"
      />
      <Button
        className={classes.searchButton}
        variant="outlined"
        onClick={handleSearch}
      >
        Поиск
      </Button>
    </Box>
  );
};
