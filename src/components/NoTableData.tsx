import React from 'react';
import type { FC } from 'react';
import { TableCell, TableRow, makeStyles } from '@material-ui/core';

type NoTableDataProps = {
  numberColumns: number;
};

const useStyles = makeStyles(() => ({
  tableCell: {
    textAlign: 'center'
  }
}));

export const NoTableData: FC<NoTableDataProps> = ({ numberColumns }) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell className={classes.tableCell} colSpan={numberColumns}>
        Нет данных
      </TableCell>
    </TableRow>
  );
};
