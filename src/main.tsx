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
  Toolbar,
  Container,
  AppBar,
  Paper
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { RouterBreadcrumbs } from './components/RouterBreadcrumbs'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppBar position='static' sx={{mb: '3em'}}>
        <Toolbar>
          <RouterBreadcrumbs 
            separator={<NavigateNextIcon sx={{ color: 'white', mb:'0.25em'}} fontSize="large" />}
            sx={{ mb: '-0.4em' }}
            color={"disabled"}
          />
        </Toolbar>
      </AppBar>
      <Container
        maxWidth='xl'
        sx={{ px: '0' }}
      >
        <Paper variant={'outlined'}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/subject/:subjectIdParam' element={<Subject />} />
          <Route path='/standard/:standardParam' element={<Standard />} />
        </Routes>
        </Paper>
      </Container>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById('root')
)
