import { Box, InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import debounce from 'lodash.debounce';
import type { ChangeEvent, FC } from 'react';
import React, { useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from 'store/order/slice';

import { StyledQueryField } from './styled';

type Sort = 'updatedAt|desc' | 'updatedAt|asc' | 'orders|desc' | 'orders|asc';

interface SortOption {
  value: Sort;
  label: string;
}

const sortOptions: SortOption[] = [
  {
    value: 'updatedAt|desc',
    label: 'Last update (newest first)',
  },
  {
    value: 'updatedAt|asc',
    label: 'Last update (oldest first)',
  },
  {
    value: 'orders|desc',
    label: 'Total orders (high to low)',
  },
  {
    value: 'orders|asc',
    label: 'Total orders (low to high)',
  },
];

export const TableFilters: FC = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState<Sort>(sortOptions[0].value);

  const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setSort(event.target.value as Sort);
  };

  const handleQueryChange = debounce(
    (query) => dispatch(setSearchQuery(query)),
    500
  );

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
      <StyledQueryField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon fontSize="small" color="action">
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          ),
        }}
        onChange={(event) => handleQueryChange(event.target.value)}
        placeholder="Поиск..."
        variant="outlined"
      />
    </Box>
  );
};
