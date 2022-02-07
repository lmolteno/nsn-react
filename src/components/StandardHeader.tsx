import { Typography } from "@mui/material";
import { Standard } from "./queries";

export const StandardHeader = ({ standard }:{ standard: Standard }) => (
    <Typography variant='h2'>{standard.basic_info.title}</Typography>
)