import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    Paper,
    TableRow
} from '@mui/material'
import { StandardSummary } from './queries'
import { StandardRow } from './StandardRow'
import { colors } from './colors'

interface StandardTableProps {
    standards: StandardSummary[]
}

export const StandardsTable = ({ standards }:StandardTableProps) => {
    return <TableContainer>
        <Table>
            <TableHead>
                <TableRow sx={{
                    backgroundColor: colors.table.headColor,
                    'th': {
                        color: colors.table.headText,
                        fontWeight: 'bold'
                    }
                }}>
                    <TableCell></TableCell> {/* Standard Number */}
                    <TableCell>Title</TableCell>
                    <TableCell>Credits</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {standards.map(standard => (
                    <StandardRow standard={standard} />
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}