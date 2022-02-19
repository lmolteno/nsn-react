import { Box, Typography } from "@mui/material";
import { Standard } from "./queries";

export const StandardHeader = ({ standard }: { standard: Standard }) => (
    <Box>
        <Typography sx={{float: 'left'}} color={'text.secondary'} variant='h3' pr={2}>
            {standard.basic_info.level}
        </Typography>
        <Typography variant='h3'>
            {standard.basic_info.title}
        </Typography>
    </Box>
)