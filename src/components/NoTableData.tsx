import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import React from 'react';

type Props = {
  numberColumns: number;
};

const useStyles = makeStyles(() => ({
  tableCell: {
    textAlign: 'center',
  },
}));

export const NoTableData = ({ numberColumns }: Props) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell className={classes.tableCell} colSpan={numberColumns}>
        Нет данных
      </TableCell>
    </TableRow>
  );
};
