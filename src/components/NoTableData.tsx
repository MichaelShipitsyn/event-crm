import { TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import styled from "styled-components";

const StyledTableCell = styled(TableCell)({
  textAlign: 'center',
});

type Props = {
  numberColumns: number;
};

export const NoTableData = ({ numberColumns }: Props) => {
  return (
    <TableRow>
      <StyledTableCell colSpan={numberColumns}>
        Нет данных
      </StyledTableCell>
    </TableRow>
  );
};
