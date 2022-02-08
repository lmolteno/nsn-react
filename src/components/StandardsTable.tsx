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
import React, { useState } from 'react'

interface StandardTableProps {
  standards: StandardSummary[]
}

export const StandardsTable = ({ standards }: StandardTableProps) => {
  const [selected, setSelected] = useState<number[]>([]);
  const numSelected = selected.length;
  const standardCount = standards.length;
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = standards.map((s) => s.standard_number);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const toggleStandard = (event: React.ChangeEvent<HTMLInputElement>, sn: number) => {
    if (event.target.checked) {
      const newSelected = [...selected, sn];
      setSelected(newSelected);
      return;
    }
    const withoutSN = selected.filter(n => n !== sn);
    setSelected(withoutSN);
  }

  return <TableContainer>
    <Table>
      <colgroup>
        <col width="2em" />
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
            toggleStandard={toggleStandard}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}