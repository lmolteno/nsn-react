import {
    TableRow,
    TableCell
} from '@mui/material'
import { StandardSummary } from './queries'
import { colors } from './colors'
import { Navigate, useNavigate } from 'react-router-dom'

interface StandardRowProps {
    standard: StandardSummary
}

export const StandardRow = ({ standard }:StandardRowProps) => {
    const navigate = useNavigate();
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
        onClick={() => {navigate(`/standard/${standard.standard_number}`)}}>
        <TableCell>
            {standard.standard_number}
        </TableCell>
        <TableCell>
            {standard.title}
        </TableCell>
        <TableCell>
            {standard.credits}
        </TableCell>
    </TableRow>)
}