import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  TableRow,
  Checkbox
} from '@mui/material'
import { StandardSummary } from './queries'
import { StandardRow } from './StandardRow'
import { colors } from './colors'
import React, { useEffect, useState } from 'react'
import { usePersistState, useSetPersistState } from '../hooks/persistState'

interface StandardTableProps {
  standards: StandardSummary[]
}

export const StandardsTable = ({ standards }: StandardTableProps) => {
  const [selected, setSelected] = usePersistState<number[]>('selectedStandards', []);
  const numSelected = selected.filter(n => !!standards.find(s => s.standard_number === n)).length;
  const standardCount = standards.length;

  useEffect(() => console.log(numSelected), [numSelected]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected([...selected, ...standards.map(s => s.standard_number)]);
      return;
    }
    setSelected(selected.filter(sn => !standards.find(s => s.standard_number === sn)));
  };

  return <TableContainer>
    <Table size='small'>
      <colgroup>
        <col width='2em' />
        <col width="5em" />
        <col />
        <col width="5em" />
      </colgroup>
      <TableHead>
        <TableRow sx={{
          backgroundColor: colors.table.headColor,
          'th': {
            color: colors.table.headText,
            fontWeight: 'bold'
          }
        }}>
          <TableCell>
            <Checkbox
              sx={{
                color: colors.lightCheckbox,
                '.Mui-checked': {
                  color: colors.lightCheckbox
                }
              }}
              indeterminate={numSelected > 0 && numSelected < standardCount}
              checked={standardCount > 0 && numSelected === standardCount}
              onChange={handleSelectAllClick}
              inputProps={{
                'aria-label': 'select all standards',
              }}
            />
          </TableCell>
          <TableCell></TableCell> {/* Standard Number */}
          <TableCell>Title</TableCell>
          <TableCell>Credits</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {standards.map(standard => (
          <StandardRow 
            standard={standard}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}