import {
    Typography,
    Collapse,
    Box,
    Tab,
    SxProps,
    Paper
} from "@mui/material";
import {
    TabPanel,
    TabList,
    TabContext
} from "@mui/lab"
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { Progress } from "../components/Progress";
import { getContent, getStandards, getSubjects, StandardSummary } from "../components/queries";
import { StandardsTable } from "../components/StandardsTable";

interface Levels {
    [x: number]: StandardSummary[]
}

export const Subject = () => {
    const [showing, showContent] = useState(false);
    const { subjectIdParam } = useParams()

    // TODO: Handle null subject ID
    if (!subjectIdParam) return <p>Nothing here</p> 
    const subjectId = parseInt(subjectIdParam) 

    const subjects = useQuery(
        'subjects',
        getSubjects
    )

    const content = useQuery(
        ['content', subjectId],
        () => getContent(subjectId)
    )

    const standards = useQuery(
        ['standards', subjectId],
        async () => {
            const standards = await getStandards(subjectId)
            let levels: Levels = {
                1: [],
                2: [],
                3: []
            } 
            standards?.forEach(s => {
                if (s.level > 0 && s.level < 4) {
                    levels[s.level] = [...levels[s.level], s]
                }
            })
            return levels;
        },
        {
            onSuccess: standards => {
                for (let i = 1; i <= 3; i++) {
                    if (!!standards[i].length) setLevel(i.toString())
                }
            }
        }
    )

    const [level, setLevel] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newLevel: string) => {
        setLevel(newLevel)
    }

    if (standards.data) {
        setTimeout(() => showContent(true), 50)
    }

    const tabPanelStyles: SxProps = {
        p: 0
    }

    const tabStyles: SxProps = {
        '& .MuiTabs-indicator': {
            top: 0,
            borderWidth: '2px',
            borderTopStyle: 'solid',
            borderColor: '#1976d2',
            backgroundColor: 'rgba(0,0,0,0)'
        },
    }

    return (!subjects.data ? (<Progress />) : 
        (
        <Box>
            <Typography>{subjects.data.find(s => s.subject_id == subjectId)?.display_name}</Typography>

            {!standards.data ? (<Progress />) :
            (
            <Collapse in={showing}>
                <Paper>
                    <TabContext value={level}>
                        <TabList sx={tabStyles} onChange={handleChange} aria-label="Level selector" variant='fullWidth'>
                            <Tab label="Level One" value="1" disabled={!standards.data[1].length}/>
                            <Tab label="Level Two" value="2" disabled={!standards.data[2].length}/>
                            <Tab label="Level Three" value="3" disabled={!standards.data[3].length}/>
                        </TabList>
                        <TabPanel value="1" sx={tabPanelStyles}>
                            <StandardsTable standards={standards.data[1]}/>
                        </TabPanel>
                        <TabPanel value="2" sx={tabPanelStyles}>
                            <StandardsTable standards={standards.data[2]}/>
                        </TabPanel>
                        <TabPanel value="3" sx={tabPanelStyles}>
                            <StandardsTable standards={standards.data[3]}/>
                        </TabPanel>
                    </TabContext>
                </Paper>
            </Collapse>
            )}
        </Box>
        )
    )
}