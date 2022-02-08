import { Box, Collapse, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { Progress } from "../components/Progress";
import { getResources, getStandard } from "../components/queries";
import { StandardHeader } from "../components/StandardHeader";

export const Standard = () => {
    const { standardParam } = useParams();
    if (!standardParam) return <p>Nothing here</p>
    const standardNumber = parseInt(standardParam)
    const [showing, setShowing] = useState(false)
    const [showingResources, setShowingResources] = useState(false)

    const standard = useQuery(
        ['standard', standardNumber],
        () => getStandard(standardNumber)
    )

    if (standard.data) setTimeout(() => {
        setShowing(true)
    }, 50);

    const resources = useQuery(
        ['resources', standardNumber],
        () => getResources(standardNumber)
    )

    if (resources.data) setTimeout(() => {
        setShowingResources(true)
    }, 50);


    return (
        !standard.data ? (<Progress />) :
        (<Collapse in={showing}>
            <StandardHeader standard={standard.data}/>
            {!resources.data ? <Progress /> :
            <Collapse in={showingResources}>
                <Typography>{resources.data[0].nzqa_url}</Typography>
            </Collapse>
            }
        </Collapse>)
    )
}