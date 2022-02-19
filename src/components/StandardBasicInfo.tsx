import { Box, Card, CardContent, CardHeader, Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { Subject, Standard } from "./queries"

interface BasicInfoParams {
    standard: Standard
}

const CardTitle = ({ name }: { name: string }) => (
    <CardContent sx={{backgroundColor: '#f7f7f7'}}>
        <Typography variant={'h5'} mb={0}>
            {name}
        </Typography>
    </CardContent>
)

const KeyValueCard = ({ name, pairs }: { name: string, pairs: [string, string][] }) => (
    <Card variant={'outlined'}>
        <CardTitle name={name} />
        <Divider />
        <CardContent>
            <Grid container spacing={2}>
                {pairs.map((p, i1) => p.map((t, i) => (
                    <Grid item 
                        key={i1.toString() + i.toString()}
                        xs={i == 0 ? 8 : 4}
                        sx={{
                            borderRight: i == 0 ? '1px solid #e0e0e0': ''
                        }}>
                        <Typography>
                            {t}
                        </Typography>
                    </Grid>
                )))}
            </Grid>
        </CardContent>
    </Card>
)

const SubjectsCard = ({ name, subjects }: { name: string, subjects: Subject[] }) => (
    <Card variant={'outlined'}>
        <CardTitle name={name} />
        <Divider />
        <CardContent>
            <Grid container spacing={2}>
                {subjects.map(s => (
                    <Grid item xs={12} component={Link} to={`/subject/${s.subject_id}`}>
                        <Typography>
                            {s.display_name}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </CardContent>
    </Card>
)

// const KeyValueChipArray = ({ pairs }: { pairs: [string, string][] }) => (
// <Chip size={'medium'} label={`${pa/>
// )

export const StandardBasicInfo = ({ standard }: BasicInfoParams) => (
    <Grid container spacing={2}>
        <Grid item xs={4}>
            <KeyValueCard
                name={'Basic Info'}
                pairs={[
                    ['Version', standard.basic_info.version.toString()],
                    ['Credits', standard.basic_info.credits.toString()],
                    ['Level', standard.basic_info.level.toString()],
                    ['Internal', standard.basic_info.internal ? 'Yes' : 'No'],
                ]}
            />
        </Grid>
        <Grid item xs={4}>
            <KeyValueCard
                name={'Literacy and Numeracy'}
                pairs={[
                    ['NCEA Literacy', standard.ncea_litnum.literacy ? 'Yes' : 'No'],
                    ['UE Reading', standard.ue_literacy.reading ? 'Yes' : 'No'],
                    ['UE Writing', standard.ue_literacy.writing ? 'Yes' : 'No'],
                    ['NCEA/UE Numeracy', standard.ncea_litnum.numeracy ? 'Yes' : 'No'],
                ]}
            />
        </Grid>
        <Grid item xs={4}>
            <SubjectsCard
                name={'Subjects'}
                subjects={standard.subjects}
            />
        </Grid>
    </Grid>
)