import {
    TableRow,
    TableCell,
    Checkbox
} from '@mui/material'
import { StandardSummary } from './queries'
import { colors } from './colors'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSetPersistState } from '../hooks/persistState'
import React from 'react'

interface StandardRowProps {
    standard: StandardSummary
    selected: number[] 
    setSelected: React.Dispatch<React.SetStateAction<number[]>>
}

export const StandardRow = ({ standard, selected, setSelected }:StandardRowProps) => {
    const navigate = useNavigate();
    const toStandard = () => {navigate(`/standard/${standard.standard_number}`)};

      const toggleStandard = (event: React.ChangeEvent<HTMLInputElement>, sn: number) => {
        if (event.target.checked) {
          setSelected([...selected, sn]);
          return;
        }
        setSelected(selected.filter(n => n !== sn));
      }

    return (<TableRow
        key={standard.standard_number}
        sx={{ 
            '&:last-child td, &:last-child th': { border: 0 },
            textDecoration: 'none',
            cursor: 'pointer',
            backgroundColor: standard.internal ? colors.table.lightRow : colors.table.darkRow,
            '&:hover': {
                opacity:0.7
            }
        }}
        >
        <TableCell>
            <Checkbox
              color="primary"
              checked={selected.includes(standard.standard_number)}
              onChange={e => toggleStandard(e, standard.standard_number)}
              inputProps={{
                'aria-label': 'select all standards',
              }}
            />
        </TableCell>
        <TableCell onClick={toStandard}>
            {standard.standard_number}
        </TableCell>
        <TableCell onClick={toStandard}>
            {standard.title}
        </TableCell>
        <TableCell onClick={toStandard}>
            {standard.credits}
        </TableCell>
    </TableRow>)
}