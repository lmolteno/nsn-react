import {
    Box,
    CircularProgress
} from '@mui/material';

export const Progress = () => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center'
    }}>
        <CircularProgress sx={{
            my: 10 
        }} />
    </Box>
);