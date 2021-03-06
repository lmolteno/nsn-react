import { Typography, Breadcrumbs } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, Link } from 'react-router-dom';
import { getSubjects } from "./queries";

interface Crumb {
  text?: string
  link?: string
}

const baseCrumb: Crumb = {
  text: 'Home',
  link: '/'
}

export const RouterBreadcrumbs = (props: {[x: string]: any}) => {
  const location = useLocation();
  const [crumbs, setCrumbs] = useState<Crumb[]>([baseCrumb]);
  const subjects = useQuery('subjects', getSubjects);

  useEffect(() => {
    const stub = location.pathname.split('/').at(-1);
    const numStub = parseInt(stub || '-1');
    if (location.pathname.includes('subject')) {
      const subjectCrumb: Crumb = {
        text: subjects.data ? subjects.data.find(s => s.subject_id === numStub)?.display_name : stub,
        link: location.pathname
      }
      setCrumbs([baseCrumb, subjectCrumb])
      return
    }
    if (location.pathname.includes('standard')) {
      const standardCrumb: Crumb = {
        text: numStub > 90000 ? `AS${stub}` : `US${stub}`,
        link: location.pathname
      }
      if (crumbs.at(-1)?.link?.includes('standard')) return
      setCrumbs([...crumbs, standardCrumb]);
      return
    }
    setCrumbs([baseCrumb])
  }, [location])

  return (
    <Breadcrumbs
     {...props}
    >
      {crumbs.map((c, idx) => {
        const last = idx === crumbs.length - 1;
        return <Typography 
          color='primary'
          variant='h4'
          sx={{ 
            textDecoration: 'none',
            '&:hover': {
              textDecoration: last ? 'none' : 'underline'
            },
            color: last ? 'white' : 'inherit'
          }}
          {...(last ? {}
          : {
            component: Link,
            to: c.link || '/'
          })}>
          {c.text}
        </Typography>
      })}
    </Breadcrumbs>
  )
}