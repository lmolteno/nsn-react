import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
 import { ReactQueryDevtools } from 'react-query/devtools'
import { Home } from './pages/Home'
import { Subject } from './pages/Subject'
import { Standard } from './pages/Standard'
import { 
  Typography,
  Container,
} from '@mui/material';
import { RouterBreadcrumbs } from './components/RouterBreadcrumbs'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
});

ReactDOM.render(
  <QueryClientProvider client={ queryClient }>
    <BrowserRouter>
        <Typography variant='h3' component={Link} to='/' sx={{
          textDecoration: 'none',
          color: 'black'
        }}>
          NSN 
        </Typography>
        <RouterBreadcrumbs 
          separator='›'
        />
      <Container maxWidth='xl'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/subject/:subjectIdParam' element={<Subject />} />
          <Route path='/standard/:standardParam' element={<Standard />} />
        </Routes>
      </Container>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById('root')
)
