import { Link } from 'react-router-dom'
import {
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper } from '@mui/material'
import { useQuery } from 'react-query'
import { getSubjects } from './queries'
import { Progress } from './Progress'
import { useState } from 'react'

const SubjectsTable = () => {
    const subjects = useQuery(
        'subjects',
        getSubjects
    )

    const [showContent, setShowContent] = useState(false);

    if (subjects.data) {
        setTimeout(() => setShowContent(true), 50)
    }

    return (
        (!subjects.data ? 
            (
                <Progress />
            ) : (
                <Collapse
                    in={showContent}
                    timeout={100}>
                    <Paper>
                        <List sx={{
                            columnCount: 4,
                            columnRule: '1px solid lightgray',
                            px: 1,
                        }}>
                            {subjects.data.map(s => {
                                return (
                                <ListItem 
                                    key={s.subject_id}
                                    disablePadding>
                                    <ListItemButton component={Link} to={`/subject/${s.subject_id}`}>
                                        <ListItemText>
                                            {s.display_name}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                )
                            })}
                        </List>
                    </Paper>
                </Collapse>
            )
        )
    )
}

export default SubjectsTable